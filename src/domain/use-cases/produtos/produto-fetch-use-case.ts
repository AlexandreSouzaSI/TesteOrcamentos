import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'
import { Either } from 'src/core/either'
import { Categoria } from '@src/domain/entities/categoria'

interface FetchRecentProdutosUseCaseRequest {
  produtoId?: string
  pageIndex: number
  name?: string
  categoriaId?: string
}

type FetchRecentProdutosUseCaseResponse = Either<
  null,
  {
    produto: {
      id: UniqueEntityId
      name: string
      quantidadeEstoque?: number | null
      quantidadeMinima?: number | null
      categoriaId?: string | null
      createdAt: Date
      updatedAt?: Date | null
      categoria?: Categoria | null
    }[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number | null
    }
  }
>

@Injectable()
export class FetchProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    pageIndex,
    name,
    categoriaId,
  }: FetchRecentProdutosUseCaseRequest): Promise<FetchRecentProdutosUseCaseResponse> {
    const produtos = await this.produtoRepository.findMany(
      { pageIndex },
      name ?? '',
      categoriaId,
    )

    const totalCount = produtos.length

    return right({
      produto: produtos,
      meta: { pageIndex, perPage: 10, totalCount },
    })
  }
}
