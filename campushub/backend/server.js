require("dotenv").config();

const express = require("express");

const app = express();

// Middleware
app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

// Public routes
app.use("/auth", authRoutes);

// Protected routes
app.use("/students", verifyToken, studentRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});