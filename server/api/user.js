const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create new user
router.post("/", async (req, res) => {
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    const user = await prisma.user.create({
      data: { totalPrice, userId, status, isInCart },
    });
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update user by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    const updatedUsers = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { totalPrice, userId, status, isInCart },
    });
    res.json(updatedUsers);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
