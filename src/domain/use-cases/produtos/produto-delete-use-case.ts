import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Either, left, right } from 'src/core/either'
import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

interface DeleteProdutoUseCaseRequest {
  id: string
}

type DeleteProdutoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    produto: Produto
  }
>

@Injectable()
export class DeleteProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    id,
  }: DeleteProdutoUseCaseRequest): Promise<DeleteProdutoUseCaseResponse> {
    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      return left(new ResourceNotFoundError())
    }

    await this.produtoRepository.delete(produto)

    return right({ produto })
  }
}
