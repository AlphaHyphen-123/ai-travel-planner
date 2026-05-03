const OpenAI = require("openai");

const generateItinerary = async ({ destination, days, interests, budgetType }) => {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("Missing DEEPSEEK_API_KEY in .env file. Please add it to use the travel planner.");
    }

    const client = new OpenAI({
      baseURL: "https://integrate.api.nvidia.com/v1",
      apiKey: apiKey,
    });

    const prompt = `
Create a ${days}-day travel itinerary for ${destination}.

Budget: ${budgetType}
Interests: ${Array.isArray(interests) ? interests.join(", ") : interests}

Return ONLY JSON:

{
  "itinerary": [
    {
      "day": 1,
      "activities": ["Visit place", "Explore market"]
    }
  ],
  "budget": {
    "flightCost": 0,
    "hotelPerDay": 0,
    "foodPerDay": 0,
    "activityPerDay": 0
  },
  "hotels": ["Hotel A", "Hotel B"]
}

IMPORTANT:
- All values must be NUMBERS only
- No currency symbols
- No text explanation
`;

    const completion = await client.chat.completions.create({
      model: "deepseek-ai/deepseek-v4-flash",
      messages: [
        { role: "system", content: "You are a travel planner AI. Always return valid JSON only." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const text = completion.choices[0].message.content;

    console.log("RAW:", text);

    // 🔥 CLEAN JSON
    const cleanText = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.log("JSON ERROR:", err.message);

      return {
        itinerary: [
          { day: 1, activities: ["Parsing failed"] }
        ]
      };
    }

    return parsed;

  } catch (error) {
    console.log("DeepSeek Error:", error.message);

    return {
      itinerary: [
        { day: 1, activities: ["LLM failed"] }
      ]
    };
  }
};

module.exports = generateItinerary;