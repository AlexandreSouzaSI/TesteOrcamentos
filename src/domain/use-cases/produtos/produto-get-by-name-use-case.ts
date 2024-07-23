import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByNameProdutoUseCaseRequest {
  name: string
}

type GetByNameProdutoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    produto: Produto
  }
>

@Injectable()
export class GetByNameProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    name,
  }: GetByNameProdutoUseCaseRequest): Promise<GetByNameProdutoUseCaseResponse> {
    const produto = await this.produtoRepository.findByName(name)

    if (!produto) {
      return left(new ResourceNotFoundError())
    }

    return right({ produto })
  }
}
