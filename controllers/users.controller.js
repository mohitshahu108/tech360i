const User = require("../models/user.model");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
// Create and Save a new user
exports.create = (req, res) => {
  //Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.repassword
  ) {
    return res.status(400).send({
      message: "information is not complete",
    });
  }

  //Create user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    repassword: bcrypt.hashSync(req.body.repassword, 8),
    isAdmin: req.body.isAdmin,
  });

  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creaing the user.",
      });
    });
};

// Retrive one user based on email
// Sign in controller
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({message: "Invalid user email or password"})

  });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        massage: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userID)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id" + req.params.userID,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectID") {
        return res.status(404).send({
          message: "Note not found wiht id" + req.params.userID,
        });
      }
      return res.status(500).send({
        message: "Note not found wiht id" + req.params.userID,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  //Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.repassword
  ) {
    return res.status(400).send({
      message: "information is not complete",
    });
  }

  //Find user and update it wiht the request body
  User.findOneAndUpdate(
    req.params.userID,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      repassword: req.body.repassword,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found wiht id" + req.params.userID,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectID") {
        return res.status(404).send({
          message: "User not found wiht id" + req.params.userID,
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.userID,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findOneAndDelete(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userID,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userID,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userID,
      });
    });
};
