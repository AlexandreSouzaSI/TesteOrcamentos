import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByNameCategoriaUseCaseRequest {
  name: string
}

type GetByNameCategoriaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class GetByNameCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    name,
  }: GetByNameCategoriaUseCaseRequest): Promise<GetByNameCategoriaUseCaseResponse> {
    const categoria = await this.categoriaRepository.findByName(name)

    if (!categoria) {
      return left(new ResourceNotFoundError())
    }

    return right({ categoria })
  }
}
