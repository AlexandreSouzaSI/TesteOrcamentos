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
import { EditProdutoUseCase } from '@src/domain/use-cases/produtos/produto-edit-use-case'

const editProdutoBodySchema = z.object({
  name: z.string().optional(),
  quantidadeEstoque: z.coerce.number().optional(),
  quantidadeMinima: z.coerce.number().optional(),
  categoriaId: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editProdutoBodySchema)

type EditProdutoBodySchema = z.infer<typeof editProdutoBodySchema>

@Controller('/product/:id')
export class EditProdutoController {
  constructor(private editProduto: EditProdutoUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProdutoBodySchema,
    @Param('id') produtoId: string,
  ) {
    const { name, quantidadeEstoque, quantidadeMinima, categoriaId } = body

    const result = await this.editProduto.execute({
      id: produtoId,
      name,
      quantidadeMinima,
      quantidadeEstoque,
      categoriaId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
