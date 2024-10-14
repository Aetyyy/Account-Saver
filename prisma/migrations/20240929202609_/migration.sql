/*
  Warnings:

  - You are about to drop the `passwordtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "passwordtokens" DROP CONSTRAINT "passwordtokens_userId_fkey";

-- DropTable
DROP TABLE "passwordtokens";

-- CreateTable
CREATE TABLE "passwordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "passwordToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "passwordToken" ADD CONSTRAINT "passwordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
