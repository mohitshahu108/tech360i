const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
const path = require("path");

//configuring env
dotenv.config();

//Routes Requiring
const app = express();

//set up default mongoose connection
const mongoDB = process.env.MONGO_DB_URL;

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//ALL MIDDLE WARE HERE!
app.use(express.json());
app.use(cors());
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});
// paypal client id
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// Require Users routes
require("./routes/users.routes")(app);
//Require Product routes
require("./routes/product.routes")(app);
//Require Orders routes
require("./routes/order.routes")(app);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000, function () {
  console.log(`Ready on http://localhost:4000`);
});
