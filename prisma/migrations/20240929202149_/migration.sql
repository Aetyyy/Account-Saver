/*
  Warnings:

  - You are about to drop the `passwordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "passwordToken" DROP CONSTRAINT "passwordToken_userId_fkey";

-- DropTable
DROP TABLE "passwordToken";

-- CreateTable
CREATE TABLE "passwordtokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "passwordtokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwordtokens_token_key" ON "passwordtokens"("token");

-- AddForeignKey
ALTER TABLE "passwordtokens" ADD CONSTRAINT "passwordtokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
