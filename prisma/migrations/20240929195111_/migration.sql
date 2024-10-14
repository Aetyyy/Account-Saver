/*
  Warnings:

  - You are about to drop the column `verifiedUser` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verifiedUser",
ADD COLUMN     "verifieduser" BOOLEAN NOT NULL DEFAULT false;
