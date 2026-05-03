const axios = require("axios");

const getWeatherForecast = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

    const response = await axios.get(url);

    return response.data.forecast.forecastday;
  } catch (error) {
    console.log("Weather API Error:", error.message);
    return [];
  }
};

module.exports = getWeatherForecast;
