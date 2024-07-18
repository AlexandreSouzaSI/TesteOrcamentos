import { right } from './../../../core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Despesas } from 'src/domain/entities/despesas'

interface EditDespesasUseCaseRequest {
  despesaId: string
  name?: string
  data?: string | null
  valor?: number
  status?: string
  dataVencimento?: string | null
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
    status,
    dataVencimento,
  }: EditDespesasUseCaseRequest): Promise<EditDespesasUseCaseResponse> {
    const despesa = await this.despesasRepository.findById(despesaId)

    if (!despesa) {
      return left(new ResourceNotFoundError())
    }

    if (status) {
      despesa.status = status
    }

    if (name) {
      despesa.name = name
    }

    if (valor) {
      despesa.valor = valor
    }

    if (dataVencimento) {
      despesa.dataVencimento = dataVencimento
    }

    despesa.data = data ?? null

    await this.despesasRepository.save(despesa)

    return right({ despesa })
  }
}
