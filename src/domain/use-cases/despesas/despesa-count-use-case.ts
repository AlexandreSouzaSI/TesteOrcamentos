import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either } from 'src/core/either'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'

interface FetchDespesaUseCaseRequest {
  userId: string
}

type FetchDespesaUseCaseResponse = Either<
  null,
  {
    despesa: number | null
  }
>

@Injectable()
export class CountDespesaUseCase {
  constructor(private despesaRepository: DespesasRepository) {}

  async execute({
    userId,
  }: FetchDespesaUseCaseRequest): Promise<FetchDespesaUseCaseResponse> {
    const despesa = await this.despesaRepository.findCount(userId)

    return right({ despesa })
  }
}
