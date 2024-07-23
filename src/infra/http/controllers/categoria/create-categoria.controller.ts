import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { CreateCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-create-use-case'
import { CategoriaAlreadyExistsError } from '@src/domain/use-cases/errors/categoria-already-exists-error'

const createCategoriaBodySchema = z.object({
  name: z.string(),
})

type CreateCategoriaBodySchema = z.infer<typeof createCategoriaBodySchema>

@Controller('/category')
@Public()
export class CreateCategoriaController {
  constructor(private createCategoria: CreateCategoriaUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCategoriaBodySchema))
  async handle(@Body() body: CreateCategoriaBodySchema) {
    const { name } = body

    const result = await this.createCategoria.execute({
      name,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CategoriaAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
