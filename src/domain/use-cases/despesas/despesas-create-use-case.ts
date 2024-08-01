import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Despesas } from '../../entities/despesas'
import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'
import { DespesasRepository } from '../../repositories/despesas-repository'

interface CreateDespesasUseCaseRequest {
  userId: UniqueEntityId
  name: string
  data?: string | null
  status?: string | null
  valor?: number | null
  quantidade?: number | null
  valorUnitario?: number | null
  categoriaId?: string | null
  dataVencimento?: string | null
  produtoId?: string | null
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
    quantidade,
    valorUnitario,
    categoriaId,
    dataVencimento,
    userId,
    produtoId,
  }: CreateDespesasUseCaseRequest): Promise<CreateDespesasUseCaseResponse> {
    const despesa = Despesas.create({
      userId,
      name,
      status,
      data,
      valor,
      quantidade,
      valorUnitario,
      categoriaId,
      dataVencimento,
      produtoId,
    })

    await this.despesaRepository.create(despesa)

    return right({
      despesa,
    })
  }
}
