import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface FetchRecentDespesasUseCaseRequest {
  userId: string
  pageIndex: number
  name?: string
  status?: string
}

type FetchRecentDespesasUseCaseResponse = Either<
  null,
  {
    despesas: {
      id: UniqueEntityId
      name: string
      data?: string | null
      valor: number
      status: string
      dataVencimento?: string | null
      createdAt: Date
      updatedAt?: Date | null
      userId: UniqueEntityId
    }[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number | null
    }
  }
>

@Injectable()
export class FetchRecentDespesasUseCase {
  constructor(private despesasRepository: DespesasRepository) {}

  async execute({
    userId,
    pageIndex,
    name,
    status,
  }: FetchRecentDespesasUseCaseRequest): Promise<FetchRecentDespesasUseCaseResponse> {
    const despesas = await this.despesasRepository.findManyRecent(
      { pageIndex },
      userId,
      name,
      status,
    )

    const totalCount = await this.despesasRepository.findCount(userId)

    return right({ despesas, meta: { pageIndex, perPage: 10, totalCount } })
  }
}
