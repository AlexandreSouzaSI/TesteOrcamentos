import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Categoria, CategoriaProps } from '@src/domain/entities/categoria'
import { PrismaCategoriaMapper } from '@src/infra/database/prisma/mappers/prisma-categoria-mapper'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeCategoria(
  override: Partial<CategoriaProps> = {},
  id?: UniqueEntityId,
) {
  const categoria = Categoria.create(
    {
      name: faker.person.firstName(),
      ...override,
    },
    id,
  )

  return categoria
}

@Injectable()
export class CategoriaFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCategoria(
    data: Partial<CategoriaProps> = {},
  ): Promise<Categoria> {
    const categoria = makeCategoria(data)

    await this.prisma.categoria.create({
      data: PrismaCategoriaMapper.toPrisma(categoria),
    })

    return categoria
  }
}
