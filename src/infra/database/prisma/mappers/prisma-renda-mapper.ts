import { Renda as PrismaRenda, Prisma } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda } from 'src/domain/entities/renda'

export class PrismaRendaMapper {
  static toDomain(raw: PrismaRenda): Renda {
    return Renda.create(
      {
        name: raw.name,
        valor: raw.valor.toNumber(),
        data: raw.data,
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
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
      data: renda.data,
      createdAt: renda.createdAt,
      updatedAt: renda.updatedAt,
    }
  }
}
