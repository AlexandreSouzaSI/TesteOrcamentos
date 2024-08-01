import {
  Despesas as PrismaDespesas,
  Categoria as PrismaCategoria,
  Prisma,
} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas } from 'src/domain/entities/despesas'
import { PrismaCategoriaMapper } from './prisma-categoria-mapper'

export class PrismaDespesasMapper {
  static toDomain(
    raw: PrismaDespesas & { categoria?: PrismaCategoria | null }, // Ajustado para ser um único objeto ou null
  ): Despesas {
    const categoria = raw.categoria
      ? PrismaCategoriaMapper.toDomain(raw.categoria)
      : null

    return Despesas.create(
      {
        name: raw.name,
        valor: raw.valor?.toNumber(),
        data: raw.data,
        status: raw.status,
        quantidade: raw.quantidade?.toNumber(),
        valorUnitario: raw.valorUnitario?.toNumber(),
        categoriaId: raw.categoriaId ? raw.categoriaId : null,
        userId: new UniqueEntityId(raw.userId),
        produtoId: raw.produtoId ? raw.produtoId : null,
        dataVencimento: raw.dataVencimento,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        categoria: categoria ?? undefined,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(despesa: Despesas): Prisma.DespesasUncheckedCreateInput {
    return {
      id: despesa.id.toString(),
      name: despesa.name,
      valor: despesa.valor ?? 0,
      data: despesa.data,
      status: despesa.status,
      quantidade: despesa.quantidade,
      valorUnitario: despesa.valorUnitario,
      categoriaId: despesa.categoriaId?.toString() ?? null,
      produtoId: despesa.produtoId?.toString() ?? null,
      userId: despesa.userId.toString(),
      dataVencimento: despesa.dataVencimento,
      createdAt: despesa.createdAt,
      updatedAt: despesa.updatedAt,
    }
  }
}
