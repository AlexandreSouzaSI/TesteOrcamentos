import { Produto as PrismaProduto, Prisma } from '@prisma/client'
import { Produto } from '@src/domain/entities/produto'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export class PrismaProdutoMapper {
  static toDomain(raw: PrismaProduto): Produto {
    return Produto.create(
      {
        name: raw.name,
        quantidadeEstoque: raw.quantidadeEstoque?.toNumber(),
        quantidadeMinima: raw.quantidadeMinima?.toNumber(),
        categoriaId: raw.categoriaId ? raw.categoriaId : null,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(produto: Produto): Prisma.ProdutoUncheckedCreateInput {
    return {
      id: produto.id.toString(),
      name: produto.name,
      quantidadeEstoque: produto.quantidadeEstoque,
      quantidadeMinima: produto.quantidadeMinima,
      categoriaId: produto.categoriaId ?? null,
    }
  }
}
