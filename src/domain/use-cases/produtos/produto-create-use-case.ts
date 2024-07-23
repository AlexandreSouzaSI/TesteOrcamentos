import { Injectable } from '@nestjs/common'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Either, left, right } from 'src/core/either'
import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

interface CreateProdutoUseCaseRequest {
  name: string
  quantidadeEstoque?: number | null
  quantidadeMinima?: number | null
  categoriaId?: string | null
}

type CreateProdutoUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    produto: Produto
  }
>

@Injectable()
export class CreateProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    name,
    quantidadeEstoque,
    quantidadeMinima,
    categoriaId,
  }: CreateProdutoUseCaseRequest): Promise<CreateProdutoUseCaseResponse> {
    const produtoWithSameName = await this.produtoRepository.findByName(name)

    if (produtoWithSameName) {
      return left(new UserAlreadyExistsError(name))
    }

    const produto = Produto.create({
      name,
      quantidadeEstoque,
      quantidadeMinima,
      categoriaId,
    })

    await this.produtoRepository.create(produto)

    return right({
      produto,
    })
  }
}
