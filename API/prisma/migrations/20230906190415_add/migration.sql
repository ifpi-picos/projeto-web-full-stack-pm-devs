/*
  Warnings:

  - Added the required column `profile_image` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "profile_image" TEXT NOT NULL;
