import {
  Produto as PrismaProduto,
  Categoria as PrismaCategoria,
  Prisma,
} from '@prisma/client'
import { Produto } from '@src/domain/entities/produto'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PrismaCategoriaMapper } from './prisma-categoria-mapper'

export class PrismaProdutoMapper {
  static toDomain(
    raw: PrismaProduto & { categoria?: PrismaCategoria | null },
  ): Produto {
    const categoria = raw.categoria
      ? PrismaCategoriaMapper.toDomain(raw.categoria)
      : null
    return Produto.create(
      {
        name: raw.name,
        quantidadeEstoque: raw.quantidadeEstoque?.toNumber(),
        quantidadeMinima: raw.quantidadeMinima?.toNumber(),
        categoriaId: raw.categoriaId ? raw.categoriaId : null,
        categoria: categoria ?? undefined,
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
