import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FetchCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-fetch-use-case'
import { CategoriaPresenter } from '../../presenters/categoria-presenter'

@Controller('/category/:id')
export class FetchCategoriaController {
  constructor(private fetchCategoria: FetchCategoriaUseCase) {}

  @Get()
  async handle(@Param('id') categoriaId: string) {
    const account = await this.fetchCategoria.execute({
      categoriaId,
    })

    if (!account) {
      throw new Error()
    }

    if (account.isLeft()) {
      throw new BadRequestException()
    }

    const categoria = account.value.categoria

    if (!categoria) {
      throw new BadRequestException('Categoia not found')
    }

    return { user: CategoriaPresenter.toHTTP(categoria) }
  }
}
