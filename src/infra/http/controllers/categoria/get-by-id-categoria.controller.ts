import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { CategoriaPresenter } from '../../presenters/categoria-presenter'
import { GetByIdCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-get-by-id-use-case'

@Controller('/category/:id')
export class GetByIdCategoriaController {
  constructor(private getByIdCategoria: GetByIdCategoriaUseCase) {}

  @Get()
  async handle(@Param('id') categoriaId: string) {
    const categoria = await this.getByIdCategoria.execute({
      categoriaId,
    })

    if (!categoria) {
      throw new Error()
    }

    if (categoria.isLeft()) {
      throw new BadRequestException()
    }

    const categoriaList = categoria.value.categoria

    if (!categoriaList) {
      throw new BadRequestException('Categoria not found')
    }

    return { categoria: CategoriaPresenter.toHTTP(categoriaList) }
  }
}
