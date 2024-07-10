import { right } from './../../../core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Despesas } from 'src/domain/entities/despesas'

interface EditDespesasUseCaseRequest {
  despesaId: string
  name: string
  data?: Date | null
  valor: number
  dataVencimento?: Date | null
  userId: UniqueEntityId
}

type EditDespesasUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    despesa: Despesas
  }
>

@Injectable()
export class EditDespesasUseCase {
  constructor(private despesasRepository: DespesasRepository) {}

  async execute({
    despesaId,
    name,
    data,
    valor,
    dataVencimento,
  }: EditDespesasUseCaseRequest): Promise<EditDespesasUseCaseResponse> {
    const despesa = await this.despesasRepository.findById(despesaId)

    if (!despesa) {
      return left(new ResourceNotFoundError())
    }

    despesa.name = name
    despesa.data = data ?? null
    despesa.valor = valor
    despesa.dataVencimento = dataVencimento ?? null

    await this.despesasRepository.save(despesa)

    return right({ despesa })
  }
}
