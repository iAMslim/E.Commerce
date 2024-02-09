const express = require("express");
const cors = require("cors");
const faker = require('faker')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Define your routes here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;