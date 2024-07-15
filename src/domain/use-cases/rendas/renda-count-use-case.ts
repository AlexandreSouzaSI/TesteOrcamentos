import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Either } from 'src/core/either'

interface FetchRendaUseCaseRequest {
  userId: string
}

type FetchRendaUseCaseResponse = Either<
  null,
  {
    renda: number | null
  }
>

@Injectable()
export class CountRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    userId,
  }: FetchRendaUseCaseRequest): Promise<FetchRendaUseCaseResponse> {
    const renda = await this.rendaRepository.findCount(userId)

    return right({ renda })
  }
}
