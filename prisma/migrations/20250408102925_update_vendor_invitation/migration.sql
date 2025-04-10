/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `VendorInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VendorInvitation_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "VendorInvitation_email_key" ON "VendorInvitation"("email");
