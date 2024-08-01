import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteProdutoUseCase } from '@src/domain/use-cases/produtos/produto-delete-use-case'
import { right } from 'src/core/either'

@Controller('/produtos/:id')
export class DeleteProdutoController {
  constructor(private produtoCategoria: DeleteProdutoUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') produtoId: string) {
    const result = await this.produtoCategoria.execute({
      id: produtoId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
