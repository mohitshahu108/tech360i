const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      require: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      require: true,
    },
    email: {
      type: String,
      minlength: 3,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minlenght: 3,
      require: true,
    },
    repassword: {
      type: String,
      minlength: 3,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
