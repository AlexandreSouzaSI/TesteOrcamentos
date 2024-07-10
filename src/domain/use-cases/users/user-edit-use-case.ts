import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repositories/user-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { User } from 'src/domain/entities/user'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface EditUserUseCaseRequest {
  id: string
  name?: string
  password?: string
  userId: UniqueEntityId
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    user: User
  }
>

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      user.name = name
    }
    if (password) {
      user.password = password
    }

    await this.userRepository.save(user)

    return right({ user })
  }
}
