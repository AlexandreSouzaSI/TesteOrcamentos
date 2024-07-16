import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either } from 'src/core/either'
import { UserRepository } from 'src/domain/repositories/user-repository'

interface DifferenceUseCaseRequest {
  userId: string
}

type DifferenceUseCaseResponse = Either<
  null,
  {
    difference: number | null
  }
>

@Injectable()
export class DifferenceUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: DifferenceUseCaseRequest): Promise<DifferenceUseCaseResponse> {
    const difference = await this.userRepository.difference(userId)

    return right({ difference })
  }
}
