const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");

const app = express();

// ✅ SECURED CORS - Only allowing production frontend
app.use(
  cors({
    origin: [
      "https://ai-travel-planner-bu3x.vercel.app",
      "https://ai-travel-planner-bu3x-shivamsen9644-5146s-projects.vercel.app",
    ],
    credentials: true,
  })
);


app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});