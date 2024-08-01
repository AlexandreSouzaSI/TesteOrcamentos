import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ProdutoPresenter } from '../../presenters/produto-presenter'
import { GetByIdProdutoUseCase } from '@src/domain/use-cases/produtos/produto-get-by-id-use-case'

@Controller('/produtos/:id')
export class GetByIdProdutoController {
  constructor(private fetchProduto: GetByIdProdutoUseCase) {}

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
