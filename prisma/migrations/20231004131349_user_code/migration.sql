/*
  Warnings:

  - You are about to drop the column `views` on the `User` table. All the data in the column will be lost.
  - Added the required column `userCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "views",
ADD COLUMN     "userCode" TEXT NOT NULL;
