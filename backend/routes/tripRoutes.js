const express = require("express");
const {
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
  updateTrip,
} = require("../controllers/tripController");
const regenerateDay = require("../controllers/regenerateDay");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Trip
router.post("/", authMiddleware, createTrip);

// Get All Trips (User specific)
router.get("/", authMiddleware, getTrips);

// Get Single Trip
router.get("/:id", authMiddleware, getTripById);

// Delete Trip
router.delete("/:id", authMiddleware, deleteTrip);

// Update Trip
router.put("/:id", authMiddleware, updateTrip);

router.post("/regenerate-day/:id", authMiddleware, regenerateDay);

module.exports = router;