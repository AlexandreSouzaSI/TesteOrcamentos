-- AlterTable
ALTER TABLE "rendas" ADD COLUMN     "categoriaId" TEXT;

-- AddForeignKey
ALTER TABLE "rendas" ADD CONSTRAINT "rendas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
