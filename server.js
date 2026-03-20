const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const addressRoutes = require("./routes/addressRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const errorHandler = require("./middleware/errorHandler");


const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
connectDB();

app.use("/api/students", studentRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);


// app.use(express.static(
//   path.join(__dirname, "..", "student-poc-frontend")
// ));
app.use(express.static(path.join(__dirname, "UI")));

// Optional route (you can skip this)
// app.get("/dashboard", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "student-poc-frontend", "dashboard.html")
//   );
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});