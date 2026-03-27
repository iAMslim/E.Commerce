-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_id_fkey";

-- CreateTable
CREATE TABLE "_BookToCart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCart_AB_unique" ON "_BookToCart"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCart_B_index" ON "_BookToCart"("B");

-- AddForeignKey
ALTER TABLE "_BookToCart" ADD CONSTRAINT "_BookToCart_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCart" ADD CONSTRAINT "_BookToCart_B_fkey" FOREIGN KEY ("B") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
