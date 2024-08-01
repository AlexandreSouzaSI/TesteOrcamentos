import {
  Renda as PrismaRenda,
  Categoria as PrismaCategoria,
  Prisma,
} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda } from 'src/domain/entities/renda'
import { PrismaCategoriaMapper } from './prisma-categoria-mapper'

export class PrismaRendaMapper {
  static toDomain(
    raw: PrismaRenda & { categoria?: PrismaCategoria | null },
  ): Renda {
    const categoria = raw.categoria
      ? PrismaCategoriaMapper.toDomain(raw.categoria)
      : null
    return Renda.create(
      {
        name: raw.name,
        valor: raw.valor.toNumber(),
        data: raw.data,
        status: raw.status ? raw.status : null,
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        categoriaId: raw.categoriaId ? raw.categoriaId : null,
        categoria: categoria ?? undefined,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(renda: Renda): Prisma.RendaUncheckedCreateInput {
    return {
      id: renda.id.toString(),
      name: renda.name,
      userId: renda.userId.toString(),
      valor: renda.valor,
      status: renda.status,
      data: renda.data,
      createdAt: renda.createdAt,
      updatedAt: renda.updatedAt,
      categoriaId: renda.categoriaId?.toString() ?? null,
    }
  }
}
