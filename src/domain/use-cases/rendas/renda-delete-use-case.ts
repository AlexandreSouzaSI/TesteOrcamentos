import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Either, left } from 'src/core/either'
import { Renda } from 'src/domain/entities/renda'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface DeleteRendaUseCaseRequest {
  rendaId: string
}

type DeleteRensaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    renda: Renda
  }
>

@Injectable()
export class DeleteRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    rendaId,
  }: DeleteRendaUseCaseRequest): Promise<DeleteRensaUseCaseResponse> {
    const renda = await this.rendaRepository.findById(rendaId)

    if (!renda) {
      return left(new ResourceNotFoundError())
    }

    await this.rendaRepository.delete(renda)

    return right({ renda })
  }
}
