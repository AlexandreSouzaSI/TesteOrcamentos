import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Either, right } from 'src/core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Categoria } from '@src/domain/entities/categoria'

interface FetchRecentRendaUseCaseRequest {
  userId: string
  pageIndex: number
  name?: string
  status?: string
  categoriaId?: string
}

type FetchRecentRendaUseCaseResponse = Either<
  null,
  {
    renda: {
      id: UniqueEntityId
      name: string
      data?: string | null
      valor: number
      status?: string | null
      createdAt: Date
      updatedAt?: Date | null
      userId: UniqueEntityId
      categoriaId?: string | null
      categoria?: Categoria | null
    }[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number | null
      totalValue: number | null
    }
  }
>

@Injectable()
export class FetchRecentRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    userId,
    pageIndex,
    name,
    categoriaId,
    status,
  }: FetchRecentRendaUseCaseRequest): Promise<FetchRecentRendaUseCaseResponse> {
    const renda = await this.rendaRepository.findManyRecent(
      { pageIndex },
      userId,
      name,
      categoriaId,
      status,
    )

    const totalCount = await this.rendaRepository.findCount(userId)
    const totalValue = await this.rendaRepository.sumRendaValues(userId)

    return right({
      renda,
      meta: { pageIndex, perPage: 10, totalCount, totalValue },
    })
  }
}
