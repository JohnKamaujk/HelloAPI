const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.set("trust proxy", true);
app.use(cors());

// Define a route
app.get("/", async (req, res) => {
  const ipAddress = req.ip;
  const weatherApiKey = "986ff9178702426d863182145240107";

  // Fetch IP location and weather information using WeatherAPI
  const locationUrl = `http://api.weatherapi.com/v1/ip.json?key=${weatherApiKey}&q=${ipAddress}`;
  const locationResponse = await axios.get(locationUrl);
  const { lat, lon } = locationResponse.data;

  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lon}`;
  const weatherResponse = await axios.get(weatherUrl);

  res.json({
    message: "Hello World",
    ip: ipAddress,
    location: locationResponse.data,
    weather: weatherResponse.data,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
