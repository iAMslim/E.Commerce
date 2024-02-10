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
        },
      });
      // Create a token with the user id
      const token = jwt.sign({ id: user.id }, process.env.JWT);
      res.status(201).send({ token });
    } catch (error) {
      next(error);
    }
  });
  
  // Login to an existing user account
  router.post("/login", async (req, res, next) => {
    try {
      const login = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
      });
  
      //bcrypt password
      const match = await bcrypt.compare(req.body.password, login?.password);
      if (!match) {
        return res.status(401).send("try credentials again");
      }
  
      // Create a token with the user id
      const token = jwt.sign({ id: login.id }, process.env.JWT);
      res.send({ token, user: { id: login.id } });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;
