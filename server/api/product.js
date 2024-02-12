const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all products/books
router.get("/", async (req, res) => {
  try {
    const product = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET product/book by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create new product
router.post("/", async (req, res) => {
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    const product = await prisma.order.create({
      data: { totalPrice, userId, status, isInCart },
    });
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update product by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    const updatedProduct = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { totalPrice, userId, status, isInCart },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({ where: { id: parseInt(id) } });
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
