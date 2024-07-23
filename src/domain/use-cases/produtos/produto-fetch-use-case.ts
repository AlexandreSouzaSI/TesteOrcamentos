import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface FetchProdutoUseCaseRequest {
  produtoId: string
}

type FetchProdutoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    produto: Produto
  }
>

@Injectable()
export class FetchProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    produtoId,
  }: FetchProdutoUseCaseRequest): Promise<FetchProdutoUseCaseResponse> {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) {
      return left(new ResourceNotFoundError())
    }

    return right({ produto })
  }
}
