import { Despesas as PrismaDespesas, Prisma } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas } from 'src/domain/entities/despesas'

export class PrismaDespesasMapper {
  static toDomain(raw: PrismaDespesas): Despesas {
    return Despesas.create(
      {
        name: raw.name,
        valor: raw.valor.toNumber(),
        data: raw.data,
        userId: new UniqueEntityId(raw.userId),
        dataVencimento: raw.dataVencimento,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(despesa: Despesas): Prisma.DespesasUncheckedCreateInput {
    return {
      id: despesa.id.toString(),
      name: despesa.name,
      valor: despesa.valor,
      data: despesa.data,
      userId: despesa.userId.toString(),
      dataVencimento: despesa.data,
      createdAt: despesa.createdAt,
      updatedAt: despesa.updatedAt,
    }
  }
}
