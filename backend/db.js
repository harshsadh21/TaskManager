/* eslint-disable no-undef */
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/task";

try {
  mongoose.connect(mongoURI);
  console.log("connected");
} catch (error) {
  console.log(error);
}
// const userSchema = mongoose.Schema({
//   name: String,
//   paswword: String,
// });

module.exports.mongoose;
