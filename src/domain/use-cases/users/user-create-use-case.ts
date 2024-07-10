import { UserRepository } from '../../repositories/user-repository'
import { User } from '../../entities/user'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../../cryptography/hash-generator'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Either, left, right } from 'src/core/either'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
