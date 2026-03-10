const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  email: String,
  course: String,
  age: Number,
  createdAt: Date
});

module.exports = mongoose.model("Student", studentSchema);