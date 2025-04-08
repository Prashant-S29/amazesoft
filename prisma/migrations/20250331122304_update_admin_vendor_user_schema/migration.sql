/*
  Warnings:

  - You are about to drop the column `slug` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `vendorSlug` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `Vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Admin_slug_key";

-- DropIndex
DROP INDEX "Vendor_slug_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "slug",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "vendorSlug",
ADD COLUMN     "vendorId" TEXT;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "slug",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
