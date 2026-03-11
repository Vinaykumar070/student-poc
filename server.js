// 

/////////////////////////////// NEW Code ////////////////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");
const Address = require("./models/Address");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

// MongoDB connection 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Test API
app.get("/", (req, res) => {
    res.send("Student POC API Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/addresses", async (req, res) => {
  try {
    const address = new Address(req.body);
    const savedAddress = await address.save();
    res.json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/student-details/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    const addresses = await Address.find({ studentId: req.params.studentId });

    res.json({
      student,
      addresses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});