/*
  Warnings:

  - You are about to drop the column `wa` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `wd` on the `flights` table. All the data in the column will be lost.
  - Added the required column `ws` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wta` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "wa",
DROP COLUMN "wd",
ADD COLUMN     "ws" INTEGER NOT NULL,
ADD COLUMN     "wta" INTEGER NOT NULL;
