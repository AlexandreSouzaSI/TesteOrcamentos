import { right } from './../../../core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Renda } from '../../entities/renda'
import { RendaRepository } from '../../repositories/renda-repository'
import { Injectable } from '@nestjs/common'
import { Either } from 'src/core/either'

interface CreateRendaUseCaseRequest {
  userId: UniqueEntityId
  name: string
  data?: string | null
  status: string
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
    status,
    data,
    userId,
  }: CreateRendaUseCaseRequest): Promise<CreateRensaUseCaseResponse> {
    const renda = Renda.create({
      name,
      userId,
      status,
      valor,
      data,
    })
    console.log('use case :', renda)

    await this.rendaRepository.create(renda)

    return right({
      renda,
    })
  }
}
