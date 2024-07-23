import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Either, left, right } from 'src/core/either'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'

interface DeleteCategoriaUseCaseRequest {
  id: string
}

type DeleteCategoriaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class DeleteCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    id,
  }: DeleteCategoriaUseCaseRequest): Promise<DeleteCategoriaUseCaseResponse> {
    const categoria = await this.categoriaRepository.findById(id)

    if (!categoria) {
      return left(new ResourceNotFoundError())
    }

    await this.categoriaRepository.delete(categoria)

    return right({ categoria })
  }
}
