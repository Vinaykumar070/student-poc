const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const addressRoutes = require("./routes/addressRoutes");


const app = express();

app.use(express.json());

connectDB();

app.use("/api/students", studentRoutes);
app.use("/api/addresses", addressRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});