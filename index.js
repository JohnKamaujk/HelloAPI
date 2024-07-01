const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.set("trust proxy", true);
app.use(cors());

// Define a route
app.get("/", (req, res) => {
  const ipAddress = req.ip;
  return res.json({ message: `Hello! Your IP address is: ${ipAddress}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
