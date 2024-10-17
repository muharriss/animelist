/*
  Warnings:

  - You are about to drop the column `providerType` on the `account` table. All the data in the column will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `providerType`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
