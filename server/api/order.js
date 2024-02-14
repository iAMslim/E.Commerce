const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Deny access if user is not logged in
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    //admin is only authorized to get all palced orders
    // const isAdmin = req.user.isAdmin;
    // if (!isAdmin) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET order by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create new order
router.post("/", async (req, res) => {
  const { totalPrice, userId, status, isInCart, orderItems } = req.body;
  try {
    // const totalPrice =
    const order = await prisma.order.create({
      data: {
        totalPrice,
        userId,
        status,
        isInCart,
        orderItems: { create: orderItems },
      },
    });
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update order by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    // //admin is only authorized to update palced orders
    // const isAdmin = req.user.isAdmin;
    // if (!isAdmin) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        totalPrice,
        userId,
        status,
        isInCart,
      },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE order by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //admin is only authorized to delete placed orders
    // const isAdmin = req.user.isAdmin;

    // if (!isAdmin) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
