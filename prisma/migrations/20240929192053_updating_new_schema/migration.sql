/*
  Warnings:

  - You are about to drop the column `userId` on the `product` table. All the data in the column will be lost.
  - Added the required column `userid` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_userId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verifiedUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "passwordtoken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "passwordtoken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwordtoken_token_key" ON "passwordtoken"("token");

-- AddForeignKey
ALTER TABLE "passwordtoken" ADD CONSTRAINT "passwordtoken_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
