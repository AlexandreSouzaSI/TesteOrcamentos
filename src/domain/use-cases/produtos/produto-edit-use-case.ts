import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

interface EditProdutoUseCaseRequest {
  id: string
  name?: string
  quantidadeEstoque?: number
  quantidadeMinima?: number
  categoriaId?: string
}

type EditProdutoUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    produto: Produto
  }
>

@Injectable()
export class EditProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    id,
    name,
    quantidadeEstoque,
    quantidadeMinima,
    categoriaId,
  }: EditProdutoUseCaseRequest): Promise<EditProdutoUseCaseResponse> {
    const produto = await this.produtoRepository.findById(id)

    if (!produto) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      produto.name = name
    }

    if (quantidadeEstoque) {
      produto.quantidadeEstoque = quantidadeEstoque
    }

    if (quantidadeMinima) {
      produto.quantidadeMinima = quantidadeMinima
    }

    if (categoriaId) {
      produto.categoriaId = categoriaId
    }

    await this.produtoRepository.save(produto)

    return right({ produto })
  }
}
