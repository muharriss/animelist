/*
  Warnings:

  - You are about to drop the column `access_token` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `access_token`,
    ADD COLUMN `accessToken` VARCHAR(191) NULL;
