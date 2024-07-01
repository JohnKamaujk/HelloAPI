const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

app.set("trust proxy", true);
app.use(cors());

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// /api/hello?visitor_name=""
app.get("/api/hello", async (req, res) => {
  try {
    const visitorName = req.query.visitor_name;
    const ipAddress = req.ip;
    const weatherApiKey = process.env.WEATHER_API_KEY;

    // Fetch IP location using WeatherAPI
    const locationUrl = `http://api.weatherapi.com/v1/ip.json?key=${weatherApiKey}&q=${ipAddress}`;
    const locationResponse = await axios.get(locationUrl);
    const { lat, lon, city } = locationResponse.data;

    // Fetch weather information using WeatherAPI
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lon}`;
    const weatherResponse = await axios.get(weatherUrl);
    const temperature = weatherResponse.data.current.temp_c;

    res.json({
      client_ip: ipAddress,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch location or weather information" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
