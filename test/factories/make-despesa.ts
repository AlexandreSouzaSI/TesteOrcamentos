import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas, DespesasProps } from 'src/domain/entities/despesas'
import { PrismaDespesasMapper } from 'src/infra/database/prisma/mappers/prisma-despesas-mapper'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeDespesa(
  override: Partial<DespesasProps> = {},
  id?: UniqueEntityId,
) {
  const Despesa = Despesas.create(
    {
      name: faker.person.firstName(),
      data: faker.date.anytime().toString(),
      valor: faker.number.float(),
      dataVencimento: faker.date.anytime().toString(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return Despesa
}

@Injectable()
export class DespesaFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDespesa(
    data: Partial<DespesasProps> = {},
  ): Promise<Despesas> {
    const despesa = makeDespesa(data)

    await this.prisma.despesas.create({
      data: PrismaDespesasMapper.toPrisma(despesa),
    })

    return despesa
  }
}
