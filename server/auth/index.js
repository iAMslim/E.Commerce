const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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
router.get("/me", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
