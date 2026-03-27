const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
require('dotenv').config();  // Ensure this is called to load .env variables

// Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        isAdmin: true,
      },
    });
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing user account
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials, try again" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials, try again" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ token, user: { id: user.id } });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", async (req, res, next) => {
  try {
    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}
    const userId = req.user.id;
    const user = await prisma.user.findFirst({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
