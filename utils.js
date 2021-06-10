const jsonwebtoken = require("jsonwebtoken");


module.exports.generateToken = (user) => {
  return jsonwebtoken.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || somethingsecret,
    {
      expiresIn: "30d",
    }
  );
};

module.exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};