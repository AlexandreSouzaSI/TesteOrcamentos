import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../../repositories/renda-repository'
import { Either, left, right } from 'src/core/either'

interface SumRendaUseCaseRequest {
  userId: string
}

type SumRendaUseCaseResponse = Either<
  null,
  {
    renda: number | null
  }
>

@Injectable()
export class SumRendaUseCase {
  constructor(private readonly rendaRepository: RendaRepository) {}

  async execute({
    userId,
  }: SumRendaUseCaseRequest): Promise<SumRendaUseCaseResponse> {
    try {
      const renda = await this.rendaRepository.sumRendaValues(userId)

      return right({ renda })
    } catch (error) {
      return left(null)
    }
  }
}
