// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   studentId: String,
//   name: String,
//   email: String,
//   course: String,
//   age: Number,
//   createdAt: Date
// });

// module.exports = mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  course: {
    type: String
  },
  age: {
    type: Number
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);