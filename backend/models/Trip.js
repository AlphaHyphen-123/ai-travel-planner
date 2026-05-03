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

    // ✅ FIXED (STRUCTURED OBJECT)
    estimatedBudget: {
      flights: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number,
      dailyCost: Number,
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