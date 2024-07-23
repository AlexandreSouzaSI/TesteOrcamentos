import { BadRequestException, Body, Controller, Get } from '@nestjs/common'
import { ProdutoPresenter } from '../../presenters/produto-presenter'
import { GetByNameProdutoUseCase } from '@src/domain/use-cases/produtos/produto-get-by-name-use-case'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const getByNameBoySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(getByNameBoySchema)

type GetByNameBoySchema = z.infer<typeof getByNameBoySchema>

@Controller('/productName/')
export class GetByNameProdutoController {
  constructor(private getByNameProduto: GetByNameProdutoUseCase) {}

  @Get()
  async handle(@Body(bodyValidationPipe) body: GetByNameBoySchema) {
    const { name } = body
    const produto = await this.getByNameProduto.execute({
      name,
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
