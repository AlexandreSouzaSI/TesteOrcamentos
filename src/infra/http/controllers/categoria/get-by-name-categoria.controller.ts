import { BadRequestException, Body, Controller, Get } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { GetByNameCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-get-by-name-use-case'
import { CategoriaPresenter } from '../../presenters/categoria-presenter'

const getByNameBoySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(getByNameBoySchema)

type GetByNameBoySchema = z.infer<typeof getByNameBoySchema>

@Controller('/categoryName/')
export class GetByNameCategoriaController {
  constructor(private getByNameCategoria: GetByNameCategoriaUseCase) {}

  @Get()
  async handle(@Body(bodyValidationPipe) body: GetByNameBoySchema) {
    const { name } = body
    const categoria = await this.getByNameCategoria.execute({
      name,
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
