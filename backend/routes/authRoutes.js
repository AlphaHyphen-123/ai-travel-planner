const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Registaer
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;