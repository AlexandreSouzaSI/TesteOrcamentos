import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'
import { Despesas } from '../../entities/despesas'
import { DespesasRepository } from '../../repositories/despesas-repository'

interface FetchRecentDespesasUseCaseRequest {
  userId: string
  page: number
}

type FetchRecentDespesasUseCaseResponse = Either<
  null,
  {
    despesas: Despesas[]
  }
>

@Injectable()
export class FetchRecentDespesasUseCase {
  constructor(private despesasRepository: DespesasRepository) {}

  async execute({
    userId,
    page,
  }: FetchRecentDespesasUseCaseRequest): Promise<FetchRecentDespesasUseCaseResponse> {
    const despesas = await this.despesasRepository.findManyRecent(
      { page },
      userId,
    )

    return right({
      despesas,
    })
  }
}
