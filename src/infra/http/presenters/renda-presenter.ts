import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda } from 'src/domain/entities/renda'

interface RendaProps {
  id: UniqueEntityId
  name: string
  data?: string | null
  valor: number
  status: string
  createdAt: Date
  updatedAt?: Date | null
  userId: UniqueEntityId
}

export class RendaPresenter {
  static toHTTP(renda: RendaProps) {
    return {
      id: renda.id.toString(),
      name: renda.name,
      data: renda.data,
      valor: renda.valor,
      status: renda.status,
      createdAt: renda.createdAt,
      updatedAt: renda.updatedAt,
      userId: renda.userId.toString(),
    }
  }

  static formatResponse(
    renda: Renda[],
    meta: { pageIndex: number; perPage: number; totalCount: number | null },
  ) {
    return {
      renda: renda.map(RendaPresenter.toHTTP),
      meta: {
        pageIndex: meta.pageIndex,
        perPage: meta.perPage,
        totalCount: meta.totalCount,
      },
    }
  }
}
