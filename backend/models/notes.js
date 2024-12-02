/* eslint-disable no-undef */
const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: mongoose.Schema.Types.String,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
    // default: "High",
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("notes", noteSchema);
