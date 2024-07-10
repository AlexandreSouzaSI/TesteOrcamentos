import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Either, left } from 'src/core/either'
import { Renda } from 'src/domain/entities/renda'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface EditRendaUseCaseRequest {
  rendaId: string
  name: string
  data?: Date | null
  valor: number
  userId: UniqueEntityId
}

type EditRensaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    renda: Renda
  }
>

@Injectable()
export class EditRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    name,
    valor,
    data,
    rendaId,
  }: EditRendaUseCaseRequest): Promise<EditRensaUseCaseResponse> {
    const renda = await this.rendaRepository.findById(rendaId)

    if (!renda) {
      return left(new ResourceNotFoundError())
    }

    renda.name = name
    renda.valor = valor
    renda.data = data ?? null

    await this.rendaRepository.save(renda)

    return right({ renda })
  }
}
