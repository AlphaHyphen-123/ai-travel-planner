const Trip = require("../models/Trip");
const OpenAI = require("openai");

const regenerateDay = async (req, res) => {
  try {
    const { dayIndex, instruction } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const { destination, days, interests, budgetType } = trip;

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("Missing DEEPSEEK_API_KEY in .env file.");
    }

    const client = new OpenAI({
      baseURL: "https://integrate.api.nvidia.com/v1",
      apiKey: apiKey,
    });

    const prompt = `
Regenerate Day ${dayIndex + 1} itinerary for ${destination}.

User instruction: ${instruction}

Trip Context:
- Interests: ${interests.join(", ")}
- Budget: ${budgetType}

Return ONLY valid JSON in this format:
{
  "day": ${dayIndex + 1},
  "activities": ["Activity 1", "Activity 2"]
}
`;

    const completion = await client.chat.completions.create({
      model: "deepseek-ai/deepseek-v4-flash",
      messages: [
        { role: "system", content: "You are a travel planner AI. Always return valid JSON only." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    trip.itinerary[dayIndex] = parsed;

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error("Regenerate Error:", err);
    res.status(500).json({ message: "Regenerate failed" });
  }
};

module.exports = regenerateDay;