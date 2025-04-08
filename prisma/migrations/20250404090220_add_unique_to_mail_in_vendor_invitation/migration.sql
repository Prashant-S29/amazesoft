/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `VendorInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VendorInvitation_mail_key" ON "VendorInvitation"("mail");
