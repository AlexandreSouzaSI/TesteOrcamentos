import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByIdProdutoUseCaseRequest {
  produtoId: string
}

type GetByIdProdutoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    produto: Produto
  }
>

@Injectable()
export class GetByIdProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    produtoId,
  }: GetByIdProdutoUseCaseRequest): Promise<GetByIdProdutoUseCaseResponse> {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) {
      return left(new ResourceNotFoundError())
    }

    return right({ produto })
  }
}
