const OpenAI = require("openai");

const generateItinerary = async ({ startPlace, destination, days, interests, budgetType, weatherSummary }) => {
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
Create a ${days}-day travel itinerary.
Starting location: ${startPlace}
Destination: ${destination}

Budget: ${budgetType}
Interests: ${Array.isArray(interests) ? interests.join(", ") : interests}

Weather Forecast Context:
${weatherSummary || "No weather data available. Plan for typical seasonal weather."}

Instructions:
- Keep activity descriptions EXTREMELY short (max 3-5 words).
- Consider travel distance and realistic flow on arrival/departure days.
- If rainy: indoor activities. If sunny: outdoor. If snowy: snow-safe.
- Be fast and concise.

Return ONLY JSON:

{
  "itinerary": [
    {
      "day": 1,
      "activities": ["Visit place", "Explore market"]
    }
  ],
  "dailyCosts": {
    "hotelPerDay": number,
    "foodPerDay": number,
    "activityPerDay": number,
    "transportPerDay": number
  },
  "hotels": ["Hotel A", "Hotel B"]
}

IMPORTANT:
- All values must be NUMBERS only
- No currency symbols
- No text explanation
- Estimates should be REALISTIC for the location and budget level
`;


    const completion = await client.chat.completions.create({
      model: "deepseek-ai/deepseek-v4-flash",
      messages: [
        { role: "system", content: "You are a travel planner AI. Always return valid JSON only." },
        { role: "user", content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 800,
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