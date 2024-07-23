import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface FetchCategoriaUseCaseRequest {
  categoriaId: string
}

type FetchCategoriaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class FetchCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    categoriaId,
  }: FetchCategoriaUseCaseRequest): Promise<FetchCategoriaUseCaseResponse> {
    const categoria = await this.categoriaRepository.findById(categoriaId)

    if (!categoria) {
      return left(new ResourceNotFoundError())
    }

    return right({ categoria })
  }
}
