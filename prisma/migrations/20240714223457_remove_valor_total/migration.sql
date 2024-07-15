/*
  Warnings:

  - You are about to drop the column `valorTotal` on the `despesas` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `rendas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "valorTotal";

-- AlterTable
ALTER TABLE "rendas" DROP COLUMN "valorTotal";
