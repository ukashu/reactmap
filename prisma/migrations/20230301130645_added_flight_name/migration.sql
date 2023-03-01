/*
  Warnings:

  - Added the required column `name` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "name" VARCHAR(25) NOT NULL;
