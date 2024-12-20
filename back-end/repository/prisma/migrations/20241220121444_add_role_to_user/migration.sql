/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Song` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Playlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_name_key" ON "Playlist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Song_title_key" ON "Song"("title");
