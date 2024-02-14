const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new cart
router.post("/", async (req, res) => {
  const { userId, books } = req.body;
  try {
    const cart = await prisma.cart.create({
      data: {
        userId: userId,
        BookInCart: {
          createMany: {
            data: books.map((book) => ({
              bookId: book.bookId,
              quantity: book.quantity,
            })),
          },
        },
      },
      include: {
        BookInCart: {
          include: {
            book: true,
          },
        },
      },
    });
    res.json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a cart by ID
router.put("/:id", async (req, res) => {
  // const { cartId } = req.params;
  const { userId, books } = req.body;
  try {
    // //checks for exisiting cart
    // const existingCart = await prisma.cart.findUnique({
    //   where: { id: parseInt(cartId) },
    // });
    // if (!existingCart) {
    //   return res.status(404).json({ error: "Cart not found" });
    // }

    //updates cart
    const updatedCart = await prisma.cart.create({
      // where: { id: parseInt(cartId) },
      data: {
        userId: userId,
        BookInCart: {
          // delteMany {}, //deletes other entries

          createMany: {
            data: books.map((book) => ({
              bookId: book.bookId,
              quantity: book.quantity,
            })),
          },
        },
      },
      include: {
        BookInCart: {
          include: {
            book: true,
          },
        },
      },
    });
    res.json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a cart by ID
router.delete("/:id", async (req, res) => {
  const { id: cartId } = req.params;
  try {
    // // Check if the cart exists
    // const existingCart = await prisma.cart.findUnique({
    //   where: { id: parseInt(cartId) }
    // });
    // if (!existingCart) {
    //   return res.status(404).json({ error: "Cart not found" });
    // }

    // Delete all associated records in the BookInCart table
    await prisma.bookInCart.deleteMany({
      where: { cartId: parseInt(cartId) },
    });

    await prisma.cart.delete({
      where: { id: parseInt(cartId) },
    });
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a cart by ID
router.get("/:id", async (req, res) => {
  const { id: cartId } = req.params;
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
      include: {
        user: true,
        BookInCart: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
