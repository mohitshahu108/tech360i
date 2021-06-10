module.exports = (app) => {
  const order = require("../controllers/order.controllers");
  const {isAuth} = require('../utils')

  //Create 
  app.post("/orders", isAuth, order.create);
  
  //Retrieve a single 
  app.get("/orders/:ordersID", isAuth, order.findOne);
  
  app.get("/orders/:ordersID/pay", isAuth, order.findOneforPay);
  
  };
