/*
  Warnings:

  - You are about to drop the `_BookToCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToCart" DROP CONSTRAINT "_BookToCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToCart" DROP CONSTRAINT "_BookToCart_B_fkey";

-- DropTable
DROP TABLE "_BookToCart";

-- AddForeignKey
ALTER TABLE "BookInCart" ADD CONSTRAINT "BookInCart_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
