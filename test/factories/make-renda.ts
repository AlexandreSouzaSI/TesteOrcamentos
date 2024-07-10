import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda, RendaProps } from 'src/domain/entities/renda'
import { PrismaRendaMapper } from 'src/infra/database/prisma/mappers/prisma-renda-mapper'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeRenda(
  override: Partial<RendaProps> = {},
  id?: UniqueEntityId,
) {
  const renda = Renda.create(
    {
      name: faker.person.firstName(),
      data: faker.date.anytime(),
      valor: faker.number.float(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return renda
}

@Injectable()
export class RendaFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRenda(data: Partial<RendaProps> = {}): Promise<Renda> {
    const renda = makeRenda(data)

    await this.prisma.renda.create({
      data: PrismaRendaMapper.toPrisma(renda),
    })

    return renda
  }
}
