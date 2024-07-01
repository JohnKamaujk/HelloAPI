const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.set("trust proxy", true);
app.use(cors());

//welcome route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// /api/hello?visitor_name=""
app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name;
  const ipAddress = req.ip;
  const weatherApiKey = "986ff9178702426d863182145240107";

  // Fetch IP location and weather information using WeatherAPI
  const locationUrl = `http://api.weatherapi.com/v1/ip.json?key=${weatherApiKey}&q=${ipAddress}`;
  const locationResponse = await axios.get(locationUrl);
  const { lat, lon } = locationResponse.data;

  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lon}`;
  const weatherResponse = await axios.get(weatherUrl);

  res.json({
    client_ip: ipAddress,
    location: locationResponse.data.city,
    greeting: `Hello, ${visitorName}!, the temperature is ${weatherResponse.data.current.temp_c} degrees Celsius in ${locationResponse.data.city}`,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
