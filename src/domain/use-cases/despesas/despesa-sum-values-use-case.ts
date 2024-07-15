import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'

interface SumDespesaUseCaseRequest {
  userId: string
}

type SumDespesaUseCaseResponse = Either<
  null,
  {
    despesa: number | null
  }
>

@Injectable()
export class SumDespesaUseCase {
  constructor(private readonly despesaRepository: DespesasRepository) {}

  async execute({
    userId,
  }: SumDespesaUseCaseRequest): Promise<SumDespesaUseCaseResponse> {
    try {
      const despesa = await this.despesaRepository.sumDespesaValues(userId)

      return right({ despesa })
    } catch (error) {
      return left(null)
    }
  }
}
