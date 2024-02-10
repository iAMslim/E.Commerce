const express = require("express");
const app = express();
const PORT = 8081;
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer") ? auth.slice(10) : null;
  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use("/auth", require("./server/auth"));
// app.use("/api", require("./server/api"));

module.exports = app;
