/*
  Warnings:

  - You are about to drop the column `userid` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `verifieduser` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `passwordtoken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "passwordtoken" DROP CONSTRAINT "passwordtoken_userid_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_userid_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "verifieduser",
ADD COLUMN     "verifiedUser" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "passwordtoken";

-- CreateTable
CREATE TABLE "passwordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "passwordToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwordToken_token_key" ON "passwordToken"("token");

-- AddForeignKey
ALTER TABLE "passwordToken" ADD CONSTRAINT "passwordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
