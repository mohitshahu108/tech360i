const Product = require("../models/product.model");

// Create and Save a new prodcut
exports.create = (req, res) => {
  //Validate request
  if (
    !req.body.Category ||
    !req.body.ImageURL ||
    !req.body.Brand ||
    !req.body.Model ||
    !req.body.Price ||
    !req.body.Processor ||
    !req.body.RAM ||
    !req.body.Graphics_Processor ||
    !req.body.Storage ||
    !req.body.Wi_Fi
  ) {
    return res.status(400).send({
      message: "information is not complete",
    });
  }

  //Create product
  const product = new Product({
    Category: req.body.Category,
    ImageURL: req.body.ImageURL,
    Brand: req.body.Brand,
    Model: req.body.Model,
    Price: req.body.Price,
    Battery_life: req.body.Battery_life,
    Battery_cell: req.body.Battery_cell,
    Processor: req.body.Processor,
    RAM: req.body.RAM,
    Graphics_Processor: req.body.Graphics_Processor,
    Storage: req.body.Storage,
    Wi_Fi: req.body.Wi_Fi,
    Bluetooth: req.body.Bluetooth,
    WebCamera: req.body.WebCamera,
  });

  product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send({
        massage: err.message || "Some error occurred while retrieving product.",
      });
    });
};

// Find a single user with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productID)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productID,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectID") {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productID,
        });
      }
      return res.status(500).send({
        message: "Product not found with id" + req.params.productID,
      });
    });
};

// Update a user identified by the productId in the request
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

  //Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.productID,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      repassword: req.body.repassword,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productID,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectID") {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productID,
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.productID,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productID,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.productID,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.productID,
      });
    });
};