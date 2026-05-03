const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },
    
    startDate: {
      type: String,
    },


    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    interests: {
      type: [String],
      required: true,
    },

    // ✅ FIXED (ARRAY)
    itinerary: [
      {
        day: Number,
        activities: [String],
      },
    ],

    // ✅ NEW (WEATHER FEATURE)
    weather: {
      type: Array,
      default: [],
    },

    // ✅ FIXED (STRUCTURED OBJECT)
    estimatedBudget: {
      hotel: Number,
      food: Number,
      activities: Number,
      transport: Number,
      total: Number,
    },

    // ✅ NEW (SAVE FEATURE)
    saved: {
      type: Boolean,
      default: false,
    },

    // ✅ OPTIONAL (better feature)
    hotels: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Trip", tripSchema);