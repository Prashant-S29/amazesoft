/*
  Warnings:

  - You are about to drop the `VendorInvitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "invitationToken" TEXT,
ADD COLUMN     "status" "VendorInvitationStatus" NOT NULL DEFAULT 'Pending';

-- DropTable
DROP TABLE "VendorInvitation";
