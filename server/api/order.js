const router = require("express").Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    const order = await prisma.order.create({
      data: { totalPrice, userId, status, isInCart },
    });
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update order by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { totalPrice, userId, status, isInCart } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { totalPrice, userId, status, isInCart },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE order by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;