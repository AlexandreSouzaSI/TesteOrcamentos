import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { right } from 'src/core/either'
import { EditCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-edit-use-case'

const editCategoriaBodySchema = z.object({
  name: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editCategoriaBodySchema)

type EditCategoriaBodySchema = z.infer<typeof editCategoriaBodySchema>

@Controller('/category/:id')
export class EditCategoriaController {
  constructor(private editCategoria: EditCategoriaUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCategoriaBodySchema,
    @Param('id') categoriaId: string,
  ) {
    const { name } = body

    const result = await this.editCategoria.execute({
      id: categoriaId,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
