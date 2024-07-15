/*
  Warnings:

  - Added the required column `status` to the `despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorTotal` to the `despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `rendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorTotal` to the `rendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "valorTotal" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "rendas" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "valorTotal" DECIMAL(65,30) NOT NULL;
