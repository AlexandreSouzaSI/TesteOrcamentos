import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByIdCategoriaUseCaseRequest {
  categoriaId: string
}

type GetByIdCategoriaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class GetByIdCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    categoriaId,
  }: GetByIdCategoriaUseCaseRequest): Promise<GetByIdCategoriaUseCaseResponse> {
    const categoria = await this.categoriaRepository.findById(categoriaId)

    if (!categoria) {
      return left(new ResourceNotFoundError())
    }

    return right({ categoria })
  }
}
