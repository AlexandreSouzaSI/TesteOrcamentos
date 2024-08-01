import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repositories/user-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { User } from 'src/domain/entities/user'

interface GetByIdUserUseCaseRequest {
  userId: string
}

type GetByIdUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class GetByIdUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetByIdUserUseCaseRequest): Promise<GetByIdUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
