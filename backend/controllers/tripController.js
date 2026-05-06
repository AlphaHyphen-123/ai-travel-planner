const Trip = require("../models/Trip");
const generateItinerary = require("../utils/generateItinerary");
const calculateBudget = require("../utils/calculateBudget");
const getHotelSuggestions = require("../utils/hotelSuggestions");
const getWeatherForecast = require("../utils/weather");


// Create Trip
exports.createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests, startDate } = req.body;

    // 🌤️ Weather logic
    const weatherData = await getWeatherForecast(destination);
    let weatherSummary = "";
    weatherData.forEach((day, index) => {
      weatherSummary += `Day ${index + 1}: ${day.day.condition.text}\n`;
    });

    // 🔥 AI call
    const aiResponse = await generateItinerary({
      destination,
      days,
      interests,
      budgetType,
      weatherSummary,
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

    const budget = calculateBudget(destination, days, budgetType);


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
      startDate,
      days,

      budgetType,
      interests,
      itinerary,
      weather: weatherData, // ✅ SAVE WEATHER
      estimatedBudget: budget,
      hotels,
      saved: false,
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