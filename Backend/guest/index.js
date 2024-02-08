// guestroutes.js

const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client');

// Route to add a book to the guest's cart
router.post('/cart/add', async (req, res) => {
  const { bookId, quantity } = req.body;
  // Assuming 'bookId' is the ID of the book being added to the cart
  try {
    // Validate bookId and quantity
    if (!bookId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    // Check if the book exists
    const book = await prisma.product.findUnique({
      where: { id: parseInt(bookId) }
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Add the book to the guest's cart
    // You may need to implement logic to handle multiple guest carts if necessary
    const cartItem = {
      bookId: book.id,
      title: book.title,
      quantity: parseInt(quantity),
      price: book.price * parseInt(quantity)
    };

    // You can store the cart items in the session, database, or any other storage mechanism
    // For simplicity, let's assume we're storing it in an array in memory
    req.session.cart = req.session.cart || [];
    req.session.cart.push(cartItem);

    res.json({ message: 'Book added to cart successfully', cart: req.session.cart });
  } catch (error) {
    console.error('Error adding book to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to view the guest's cart
router.get('/cart', (req, res) => {
  try {
    // Retrieve the guest's cart from the session or database
    const cart = req.session.cart || [];
    res.json(cart);
  } catch (error) {
    console.error('Error fetching guest cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to edit the guest's cart
router.put('/cart/edit', (req, res) => {
  const { bookId, quantity } = req.body;
  try {
    // Validate bookId and quantity
    if (!bookId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    // Retrieve the guest's cart from the session or database
    const cart = req.session.cart || [];
    
    // Find the cart item with the specified bookId
    const cartItemIndex = cart.findIndex(item => item.bookId === parseInt(bookId));
    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Book not found in cart' });
    }

    // Update the quantity of the book in the cart
    cart[cartItemIndex].quantity = parseInt(quantity);
    cart[cartItemIndex].price = cart[cartItemIndex].quantity * cart[cartItemIndex].price;

    res.json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error editing guest cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to remove a book from the guest's cart
router.delete('/cart/remove/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  try {
    // Retrieve the guest's cart from the session or database
    let cart = req.session.cart || [];

    // Filter out the book with the specified bookId from the cart
    cart = cart.filter(item => item.bookId !== parseInt(bookId));

    // Update the guest's cart in the session or database
    req.session.cart = cart;

    res.json({ message: 'Book removed from cart successfully', cart });
  } catch (error) {
    console.error('Error removing book from guest cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to checkout (purchase) the items in the guest's cart
router.post('/cart/checkout', async (req, res) => {
  try {
    // Retrieve the guest's cart from the session or database
    const cart = req.session.cart || [];

    // Perform checkout logic here, such as calculating total price, creating order, etc.
    // For simplicity, let's assume we're just returning the total price of the items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // Clear the guest's cart after checkout
    req.session.cart = [];

    res.json({ message: 'Checkout successful', totalPrice });
  } catch (error) {
    console.error('Error checking out:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
