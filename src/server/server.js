const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const path = require("path");
const socket = require("socket.io"); 
const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    req.user = null;
  }

  next();
});

// Routes for backend
app.use("/auth", require("./auth/index"));
app.use("/api", require("./api"))

// Serve static files from the 'e.commerce/dist' directory
app.use("/", express.static(path.join(__dirname, "../../dist")));

// Define a route to serve the 'index.html' file for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.use((req, res) => {
  res.status(404).send("Not found.");
});

// Initialize the server with Vite integration
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Socket.IO setup
const io = socket(server, {
  allowEIO3: true,
  cors: {credentials: true, origin: 'http://localhost:3000/'},
});

module.exports = app;
