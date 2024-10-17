/*
  Warnings:

  - You are about to drop the column `githubId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `User_githubId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `githubId`,
    DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `session`;
