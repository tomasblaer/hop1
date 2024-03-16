/*
  Warnings:

  - You are about to drop the `itemType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_itemTypeId_fkey";

-- DropForeignKey
ALTER TABLE "itemType" DROP CONSTRAINT "itemType_companyId_fkey";

-- DropTable
DROP TABLE "itemType";

-- CreateTable
CREATE TABLE "item_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_type" ADD CONSTRAINT "item_type_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
