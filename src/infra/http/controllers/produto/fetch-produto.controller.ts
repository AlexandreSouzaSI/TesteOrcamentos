import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FetchProdutoUseCase } from '@src/domain/use-cases/produtos/produto-fetch-use-case'
import { ProdutoPresenter } from '../../presenters/produto-presenter'

@Controller('/product/:id')
export class FetchProdutoController {
  constructor(private fetchProduto: FetchProdutoUseCase) {}

  @Get()
  async handle(@Param('id') produtoId: string) {
    const produto = await this.fetchProduto.execute({
      produtoId,
    })

    if (!produto) {
      throw new Error()
    }

    if (produto.isLeft()) {
      throw new BadRequestException()
    }

    const produtoList = produto.value.produto

    if (!produtoList) {
      throw new BadRequestException('Produto not found')
    }

    return { produto: ProdutoPresenter.toHTTP(produtoList) }
  }
}
