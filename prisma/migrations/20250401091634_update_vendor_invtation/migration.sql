/*
  Warnings:

  - Added the required column `mail` to the `VendorInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendorInvitation" ADD COLUMN     "mail" TEXT NOT NULL;
