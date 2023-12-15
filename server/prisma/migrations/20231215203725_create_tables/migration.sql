/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `gameId` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `ownerId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingStars` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Game" ("id", "imageUrl", "title") SELECT "id", "imageUrl", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "gameDays" TEXT NOT NULL,
    "hourInit" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useMicrophone" BOOLEAN NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ratingStars" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "players" TEXT NOT NULL DEFAULT '',
    "maxPlayers" INTEGER NOT NULL DEFAULT 10,
    CONSTRAINT "Group_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Group_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("createdDate", "discord", "gameDays", "gameId", "hourEnd", "hourInit", "id", "name", "useMicrophone") SELECT "createdDate", "discord", "gameDays", "gameId", "hourEnd", "hourInit", "id", "name", "useMicrophone" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");
