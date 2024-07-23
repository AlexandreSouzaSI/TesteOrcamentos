-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "produto_id" TEXT,
ALTER COLUMN "valor" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantidadeEstoque" DECIMAL(65,30),
    "quantidadeMinima" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "categoriaId" TEXT,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
