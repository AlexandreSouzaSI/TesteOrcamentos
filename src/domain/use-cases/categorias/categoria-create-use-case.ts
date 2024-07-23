import { Injectable } from '@nestjs/common'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Either, left, right } from 'src/core/either'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'

interface CreateCategoriaUseCaseRequest {
  name: string
}

type CreateCategoriaUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class CreateCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    name,
  }: CreateCategoriaUseCaseRequest): Promise<CreateCategoriaUseCaseResponse> {
    const categoriaWithSameName =
      await this.categoriaRepository.findByName(name)

    if (categoriaWithSameName) {
      return left(new UserAlreadyExistsError(name))
    }

    const categoria = Categoria.create({
      name,
    })

    await this.categoriaRepository.create(categoria)

    return right({
      categoria,
    })
  }
}
