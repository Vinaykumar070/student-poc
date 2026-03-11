const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["permanent", "current"],
    required: true
  },
  street: String,
  city: String,
  state: String,
  pincode: String
});

module.exports = mongoose.model("Address", addressSchema);
