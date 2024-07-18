import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas } from '../../entities/despesas'
import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'
import { DespesasRepository } from '../../repositories/despesas-repository'

interface CreateDespesasUseCaseRequest {
  userId: UniqueEntityId
  name: string
  data?: string | null
  status: string
  valor: number
  dataVencimento: string
}

type CreateDespesasUseCaseResponse = Either<
  null,
  {
    despesa: Despesas
  }
>

@Injectable()
export class CreateDespesasUseCase {
  constructor(private despesaRepository: DespesasRepository) {}

  async execute({
    name,
    data,
    valor,
    status,
    dataVencimento,
    userId,
  }: CreateDespesasUseCaseRequest): Promise<CreateDespesasUseCaseResponse> {
    const despesa = Despesas.create({
      userId,
      name,
      status,
      data,
      valor,
      dataVencimento,
    })

    await this.despesaRepository.create(despesa)

    return right({
      despesa,
    })
  }
}
