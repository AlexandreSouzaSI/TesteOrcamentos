import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { Despesas } from 'src/domain/entities/despesas'
import { Either, right } from 'src/core/either'

interface FetchDespesasUseCaseRequest {
  despesaId: string
}

type FetchDespesasUseCaseResponse = Either<
  null,
  {
    despesas: Despesas | null
  }
>

@Injectable()
export class FetchDespesasUseCase {
  constructor(private despesaRepository: DespesasRepository) {}

  async execute({
    despesaId,
  }: FetchDespesasUseCaseRequest): Promise<FetchDespesasUseCaseResponse> {
    const despesas = await this.despesaRepository.findById(despesaId)

    return right({
      despesas,
    })
  }
}
