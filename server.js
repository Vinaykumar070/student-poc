const express = require("express");
const connectDB = require("./config/db");
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});