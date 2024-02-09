const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    // Generate sample users
    const users = [
      { username: "Andre_New", password: "andre123", isAdmin: true },
      { username: "James_New", password: "james123", isAdmin: true },
      { username: "Charles_New", password: "charles123", isAdmin: true },
      { username: "Example_New", password: "example123", isAdmin: false },
      { username: "Example1_New", password: "example123", isAdmin: false },
    ];

    // Create users in the database
    const createdUsers = await prisma.user.createMany({
      data: users,
    });

    console.log("Users seeded:", createdUsers.length);

    // Generate sample orders
    const orders = [
      {
        userId: createdUsers.find(user => user.username === "Andre_New").id,
        totalPrice: 50.25,
        status: "PENDING",
        isInCart: false,
      },
      {
        userId: createdUsers.find(user => user.username === "James_New").id,
        totalPrice: 82.99,
        status: "PROCESSING",
        isInCart: true,
      },
      {
        userId: createdUsers.find(user => user.username === "Charles_New").id,
        totalPrice: 46.99,
        status: "SHIPPED",
        isInCart: false,
      },
      {
        userId: createdUsers.find(user => user.username === "Example_New").id,
        totalPrice: 32.99,
        status: "DELIVERED",
        isInCart: false,
      },
      {
        userId: createdUsers.find(user => user.username === "Example1_New").id,
        totalPrice: 16.99,
        status: "CANCELLED",
        isInCart: false,
      },
    ];

    // Create orders in the database
    const createdOrders = await prisma.order.createMany({
      data: orders,
    });

    console.log("Orders seeded:", createdOrders.length);

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

seed();
