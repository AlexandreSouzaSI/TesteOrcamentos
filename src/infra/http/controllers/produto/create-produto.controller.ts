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
import { CreateProdutoUseCase } from '@src/domain/use-cases/produtos/produto-create-use-case'
import { ProdutoAlreadyExistsError } from '@src/domain/use-cases/errors/produto-already-exists-error copy'

const createProdutoBodySchema = z.object({
  name: z.string(),
  quantidadeEstoque: z.coerce.number().optional(),
  quantidadeMinima: z.coerce.number().optional(),
  categoriaId: z.string().optional(),
})

type CreateProdutoBodySchema = z.infer<typeof createProdutoBodySchema>

@Controller('/produtos')
@Public()
export class CreateProdutoController {
  constructor(private createProduto: CreateProdutoUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createProdutoBodySchema))
  async handle(@Body() body: CreateProdutoBodySchema) {
    const { name, quantidadeEstoque, quantidadeMinima, categoriaId } = body

    const result = await this.createProduto.execute({
      name,
      quantidadeEstoque,
      quantidadeMinima,
      categoriaId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProdutoAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
