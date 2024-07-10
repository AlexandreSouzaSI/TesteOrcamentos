import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { Either, left } from 'src/core/either'
import { Despesas } from 'src/domain/entities/despesas'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface DeleteDespesasUseCaseRequest {
  despesaId: string
}

type DeleteDespesasUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    despesa: Despesas
  }
>

@Injectable()
export class DeleteDespesasUseCase {
  constructor(private despesaRepository: DespesasRepository) {}

  async execute({
    despesaId,
  }: DeleteDespesasUseCaseRequest): Promise<DeleteDespesasUseCaseResponse> {
    const despesa = await this.despesaRepository.findById(despesaId)

    if (!despesa) {
      return left(new ResourceNotFoundError())
    }

    await this.despesaRepository.delete(despesa)

    return right({ despesa })
  }
}
