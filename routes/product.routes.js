module.exports = (app) => {
 const products = require("../controllers/products.controller");

  //Create a new User
  app.post("/products", products.create);

  //Retrieve all products
  app.get("/products", products.findAll);

  //Retrieve a single user with productID
  app.get("/products/:productID", products.findOne);

  //Update a user with productID
  app.put("/products/:productID", products.update);

  //Delete a User with productID
  app.delete("/products/:productID", products.delete);
};
