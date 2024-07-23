import { Categoria as PrismaCategoria, Prisma } from '@prisma/client'
import { Categoria } from '@src/domain/entities/categoria'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export class PrismaCategoriaMapper {
  static toDomain(raw: PrismaCategoria): Categoria {
    return Categoria.create(
      {
        name: raw.name,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(categoria: Categoria): Prisma.CategoriaUncheckedCreateInput {
    return {
      id: categoria.id.toString(),
      name: categoria.name,
    }
  }
}
