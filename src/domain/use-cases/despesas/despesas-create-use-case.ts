import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas } from '../../entities/despesas'
import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'
import { DespesasRepository } from '../../repositories/despesas-repository'

interface CreateDespesasUseCaseRequest {
  userId: UniqueEntityId
  name: string
  data?: Date | null
  valor: number
  dataVencimento?: Date | null
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
    dataVencimento,
    userId,
  }: CreateDespesasUseCaseRequest): Promise<CreateDespesasUseCaseResponse> {
    const despesa = Despesas.create({
      userId,
      name,
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
