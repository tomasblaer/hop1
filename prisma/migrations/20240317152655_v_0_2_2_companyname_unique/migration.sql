/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");
