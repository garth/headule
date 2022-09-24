/*
  Warnings:

  - You are about to drop the column `roles` on the `organisation_user` table. All the data in the column will be lost.
  - Added the required column `role` to the `organisation_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organisation_user" DROP COLUMN "roles",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "role";
