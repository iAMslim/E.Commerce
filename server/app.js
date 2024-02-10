const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const app = express();
const jwt = require("jsonwebtoken");

//Middleware for logging
app.use(morgan("dev"));

//Middleware for body parsing
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }

  next();
});

// Routes for backend
app.use("/auth", require("./auth"));
// app.use("/api", require("./api"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
app.use((req, res) => {
  res.status(404).send("Not found.");
});

module.exports = app;
