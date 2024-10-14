/*
  Warnings:

  - A unique constraint covering the columns `[userId,token]` on the table `passwordtokens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "passwordtokens_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "passwordtokens_userId_token_key" ON "passwordtokens"("userId", "token");
