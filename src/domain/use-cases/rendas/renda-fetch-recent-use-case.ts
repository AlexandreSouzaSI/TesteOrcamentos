import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Either, right } from 'src/core/either'
import { Renda } from 'src/domain/entities/renda'

interface FetchRecentRendaUseCaseRequest {
  userId: string
  page: number
}

type FetchRecentRensaUseCaseResponse = Either<
  null,
  {
    renda: Renda[]
  }
>

@Injectable()
export class FetchRecentRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({
    userId,
    page,
  }: FetchRecentRendaUseCaseRequest): Promise<FetchRecentRensaUseCaseResponse> {
    const renda = await this.rendaRepository.findManyRecent({ page }, userId)

    return right({ renda })
  }
}
