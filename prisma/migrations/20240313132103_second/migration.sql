/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Link_content_key` ON `Link`(`content`);
