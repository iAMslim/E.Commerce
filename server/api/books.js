const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET book by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create new book
router.post("/", async (req, res) => {
  const { isAdmin } = req.username;

  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  
  try {
    const inStock = true;
    const isPopular = false;
    const imgUrl = req.body.imgUrl || ""
    const price = req.body.price || 0

    const book = await prisma.book.create({
      data: {
        title: req.body.title,
        price: price,
        description: req.body.description,
        inStock: inStock,
        isPopular: isPopular,
        imgUrl: imgUrl,
      },
    });
    res.json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update book by ID
//add in to where only admin can update books
router.put("/:id", async (req, res) => {
  const { id } = req.params; 
  const { isAdmin } = req.username;

  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  
  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { 
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        inStock: req.body.inStock,
        isPopular: req.body.isPopular,
        imgUrl: req.body.imgUrl,
      },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE book by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.username;

  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.json({ message: "book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
