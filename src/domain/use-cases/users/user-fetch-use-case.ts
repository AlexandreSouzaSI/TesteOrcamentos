import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repositories/user-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { User } from 'src/domain/entities/user'

type FetchUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    users: User[]
  }
>

@Injectable()
export class FetchUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FetchUserUseCaseResponse> {
    const users = await this.userRepository.findMany()

    if (!users) {
      return left(new ResourceNotFoundError())
    }

    return right({ users })
  }
}
