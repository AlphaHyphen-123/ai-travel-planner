const Trip = require("../models/Trip");
const generateItinerary = require("../utils/generateItinerary");
const calculateBudget = require("../utils/calculateBudget");
const getHotelSuggestions = require("../utils/hotelSuggestions");

// Create Trip
exports.createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    // 🔥 AI call
    const aiResponse = await generateItinerary({
      destination,
      days,
      interests,
      budgetType,
    });

    // =========================
    // ✅ FIX 1: SAFE ITINERARY
    // =========================
    const itinerary = Array.isArray(aiResponse.itinerary)
      ? aiResponse.itinerary
      : [
          {
            day: 1,
            activities: ["Unable to generate itinerary. Please try again."],
          },
        ];

    // =========================
    // ✅ FIX 2: NORMALIZE BUDGET
    // =========================
    const cleanNumber = (val) => {
      if (!val) return 0;
      return Number(val.toString().replace(/[^0-9]/g, ""));
    };

    let budget;

    if (aiResponse.budget && typeof aiResponse.budget === "object") {
      const total = cleanNumber(aiResponse.budget.total);

      if (total > 0) {
        // 🔥 SMART DISTRIBUTION
        budget = {
          flights: Math.floor(total * 0.4),
          accommodation: Math.floor(total * 0.3),
          food: Math.floor(total * 0.2),
          activities: Math.floor(total * 0.1),
          total: total,
          dailyCost: Math.floor(total / days),
        };
      } else {
        budget = calculateBudget(days, budgetType);
      }
    } else {
      budget = calculateBudget(days, budgetType);
    }

    // =========================
    // ✅ FIX 3: HOTELS SAFE
    // =========================
    const hotels =
      Array.isArray(aiResponse.hotels) && aiResponse.hotels.length > 0
        ? aiResponse.hotels
        : getHotelSuggestions(destination, budgetType);

    // =========================
    // ✅ SAVE TRIP
    // =========================
    const trip = await Trip.create({
      user: req.user.id,
      destination,
      days,
      budgetType,
      interests,
      itinerary,
      estimatedBudget: budget,
      hotels,
      saved: false, // 🔥 NEW FIELD
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get User Trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Trip
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    await trip.deleteOne();

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Trip (edit + save)
exports.updateTrip = async (req, res) => {
  try {
    const { itinerary, estimatedBudget, hotels, saved } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (itinerary) trip.itinerary = itinerary;
    if (estimatedBudget) trip.estimatedBudget = estimatedBudget;
    if (hotels) trip.hotels = hotels;

    // 🔥 SAVE FEATURE
    if (typeof saved === "boolean") {
      trip.saved = saved;
    }

    await trip.save();

    res.json(trip);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};