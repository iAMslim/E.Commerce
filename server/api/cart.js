const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new cart
router.post('/', isAdmin, async (req, res) => {
    try {
        const cart = await prisma.cart.create({
            data: {
                // Add fields based on your schema
            },
        });
        res.json(cart);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a cart by ID
router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCart = await prisma.cart.update({
            where: { id: parseInt(id) },
            data: {
                // Update fields to match schema properly, this is only rough draft
            },
        });
        res.json(updatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a cart by ID
router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cart.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
