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

// CHECKOUT current user's cart
router.post("/checkout", async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        BookInCart: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!cart || cart.BookInCart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItemsData = cart.BookInCart.map((item) => ({
      bookId: item.bookId,
      quantity: item.quantity,
      totalPrice: item.quantity * item.book.price,
    }));

    const totalPrice = orderItemsData.reduce((sum, item) => {
      return sum + item.totalPrice;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: "PENDING",
        isInCart: false,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: {
            book: true,
          },
        },
      },
    });

    await prisma.bookInCart.deleteMany({
      where: { cartId: cart.id },
    });

    await prisma.cart.delete({
      where: { id: cart.id },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            book: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get my orders
router.get("/my-orders", async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            book: true,
          },
        },
      },
      orderBy: {
        orderDate: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.user.id;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid order id" });
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        orderItems: {
          include: {
            book: true,
          },
        },
      },
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

// POST create new order manually
router.post("/", async (req, res) => {
  const { totalPrice, status, isInCart, orderItems } = req.body;
  const userId = req.user.id;

  try {
    const order = await prisma.order.create({
      data: {
        totalPrice,
        userId,
        status,
        isInCart,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: true,
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
  const { totalPrice, status, isInCart } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        totalPrice,
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
