// engineerRoutes.js

const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client');

// Import other necessary modules/controllers as needed

// Route to register a new admin user
router.post('/admin/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new admin user in the database using Prisma Client
    const newAdminUser = await prisma.user.create({
      data: {
        email,
        password,
        role: 'admin'
      }
    });
    res.json(newAdminUser);
  } catch (error) {
    console.error('Error registering admin user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to edit an existing admin user
router.put('/admin/:id', async (req, res) => {
  const adminUserId = parseInt(req.params.id);
  const { email, password } = req.body;
  try {
    // Update the admin user with the specified ID in the database using Prisma Client
    const updatedAdminUser = await prisma.user.update({
      where: { id: adminUserId },
      data: {
        email,
        password
      }
    });
    res.json(updatedAdminUser);
  } catch (error) {
    console.error('Error updating admin user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete an existing admin user
router.delete('/admin/:id', async (req, res) => {
  const adminUserId = parseInt(req.params.id);
  try {
    // Delete the admin user with the specified ID from the database using Prisma Client
    await prisma.user.delete({
      where: { id: adminUserId }
    });
    res.json({ message: 'Admin user deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to register a new CEO user
router.post('/ceo/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new CEO user in the database using Prisma Client
    const newCEOUser = await prisma.user.create({
      data: {
        email,
        password,
        role: 'CEO'
      }
    });
    res.json(newCEOUser);
  } catch (error) {
    console.error('Error registering CEO user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to register a new CTO user
router.post('/cto/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new CTO user in the database using Prisma Client
    const newCTOUser = await prisma.user.create({
      data: {
        email,
        password,
        role: 'CTO'
      }
    });
    res.json(newCTOUser);
  } catch (error) {
    console.error('Error registering CTO user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes for engineer-specific functionality as needed

module.exports = router;