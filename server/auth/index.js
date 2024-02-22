const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Store the decoded token payload in the request object
    req.user = decoded;
    next();
  });
};


//register
router.post("/register", async (req, res, next) => {
  try {
    // const { username, password } = req.body;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        isAdmin: true,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing user account
router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.username)
      return res.status(401).send("Invalid login credentials");
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    });

    if (user.username !== req.body.username)
      return res.status(401).send("Invalid credentials, try again");
    const match = await bcrypt.compare(req.body.password, user?.password);
    if (!match) {
      return res.status(401).send("try credentials again");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({ token, user: { id: user.id } });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId)
      },
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
