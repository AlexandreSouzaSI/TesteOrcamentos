-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "categoria_id" TEXT,
ADD COLUMN     "quantidade" DECIMAL(65,30),
ADD COLUMN     "valorUnitario" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
