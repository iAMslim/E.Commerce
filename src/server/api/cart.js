const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// Create a new cart or add to existing cart
router.post("/", async (req, res) => {
  const { books } = req.body;
  const userId = req.user.id;

  try {
    const existingCart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        BookInCart: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!existingCart) {
      const cart = await prisma.cart.create({
        data: {
          userId,
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

      return res.json(cart);
    }

    for (const item of books) {
      const existingBook = await prisma.bookInCart.findFirst({
        where: {
          cartId: existingCart.id,
          bookId: item.bookId,
        },
      });

      if (existingBook) {
        await prisma.bookInCart.update({
          where: { id: existingBook.id },
          data: {
            quantity: existingBook.quantity + item.quantity,
          },
        });
      } else {
        await prisma.bookInCart.create({
          data: {
            cartId: existingCart.id,
            bookId: item.bookId,
            quantity: item.quantity,
          },
        });
      }
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { id: existingCart.id },
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
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update items in cart
router.put("/item/:bookInCartId", async (req, res) => {
  const { bookInCartId } = req.params;
  const { quantity } = req.body;

  try {
    const existingItem = await prisma.bookInCart.findUnique({
      where: { id: parseInt(bookInCartId) },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (quantity <= 0) {
      await prisma.bookInCart.delete({
        where: { id: parseInt(bookInCartId) },
      });

      return res.json({ message: "Item removed from cart" });
    }

    const updatedItem = await prisma.bookInCart.update({
      where: { id: parseInt(bookInCartId) },
      data: { quantity },
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete an item from the cart
router.delete("/item/:bookInCartId", async (req, res) => {
  const { bookInCartId } = req.params;

  try {
    const item = await prisma.bookInCart.findUnique({
      where: { id: parseInt(bookInCartId) },
    });

    if (!item) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await prisma.bookInCart.delete({
      where: { id: parseInt(bookInCartId) },
    });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing cart item:", error);
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

//get user cart
router.get("/my-cart", async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        BookInCart: {
          include: {
            book: true,
          },
        },
      },
    });

    // If no cart exists, return empty cart instead of error
    if (!cart) {
      return res.json({
        id: null,
        BookInCart: [],
      });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
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
