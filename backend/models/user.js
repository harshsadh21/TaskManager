/* eslint-disable no-undef */
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
const user = mongoose.model("user", userSchema);

// user.createIndexes()
module.exports = user;
