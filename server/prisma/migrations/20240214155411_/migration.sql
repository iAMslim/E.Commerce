/*
  Warnings:

  - You are about to drop the `ProductInCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductInCart" DROP CONSTRAINT "ProductInCart_cartId_fkey";

-- DropTable
DROP TABLE "ProductInCart";

-- CreateTable
CREATE TABLE "BookInCart" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookInCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookInCart" ADD CONSTRAINT "BookInCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
