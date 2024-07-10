import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Renda } from 'src/domain/entities/renda'
import { Either } from 'src/core/either'

interface FetchRendaUseCaseRequest {
  rendaId: string
}

type FetchRendaUseCaseResponse = Either<
  null,
  {
    renda: Renda | null
  }
>

@Injectable()
export class FetchRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    rendaId,
  }: FetchRendaUseCaseRequest): Promise<FetchRendaUseCaseResponse> {
    const renda = await this.rendaRepository.findById(rendaId)

    return right({ renda })
  }
}
