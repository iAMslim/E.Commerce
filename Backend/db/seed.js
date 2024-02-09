const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    // await prisma.user.deleteMany();
    // console.log("Existing users deleted");

    const users = [
      { username: "dre_New", password: "andre123", isAdmin: true },
      { username: "Jameie_New", password: "james123", isAdmin: true },
      { username: "Aaron_New", password: "example123", isAdmin: false },
      { username: "Charles", password: "example123", isAdmin: false },
      { username: "Rich", password: "example123", isAdmin: true },
    ];

    console.log("Users seeded: 4");

    const orders = [
      {
        userId: 1,
        totalPrice: 50.25,
        isInCart: false,
        status: "PENDING"
      },
      {
        userId: 2,
        totalPrice: 82.99,
        isInCart: false,
        status: "PENDING"
      },
      {
        userId: 3,
        totalPrice: 46.99,
        isInCart: false,
        status: "PENDING"
      },
      {
        userId: 4,
        totalPrice: 32.99,
        isInCart: false,
        status: "PENDING"
      },
      {
        userId: 5,
        totalPrice: 16.99,
        isInCart: false,
        status: "PENDING"
      },
    ];

  
       
        await prisma.order.createMany({
          data: orders,
        });
    
        console.log("Orders seeded.");
    
      
        await prisma.user.createMany({
          data: users,
        });
    
        console.log("Users seeded.");
      } catch (error) {
        console.error("Error seeding database:", error);
      } finally {
        await prisma.$disconnect();
      }
    };

    seed()