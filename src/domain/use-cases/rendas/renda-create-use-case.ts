import { right } from './../../../core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda } from '../../entities/renda'
import { RendaRepository } from '../../repositories/renda-repository'
import { Injectable } from '@nestjs/common'
import { Either } from 'src/core/either'

interface CreateRendaUseCaseRequest {
  userId: UniqueEntityId
  name: string
  data?: Date | null
  valor: number
}

type CreateRensaUseCaseResponse = Either<
  null,
  {
    renda: Renda
  }
>

@Injectable()
export class CreateRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    name,
    valor,
    data,
    userId,
  }: CreateRendaUseCaseRequest): Promise<CreateRensaUseCaseResponse> {
    const renda = Renda.create({
      name,
      userId,
      valor,
      data,
    })

    await this.rendaRepository.create(renda)

    return right({
      renda,
    })
  }
}
