/*
  Warnings:

  - You are about to drop the column `adminId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_adminId_fkey";

-- DropIndex
DROP INDEX "Group_adminId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "adminId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- CreateIndex
CREATE UNIQUE INDEX "Group_userId_key" ON "Group"("userId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
