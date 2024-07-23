import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-delete-use-case'
import { right } from 'src/core/either'

@Controller('/category/:id')
export class DeleteCategoriaController {
  constructor(private deleteCategoria: DeleteCategoriaUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') userId: string) {
    const result = await this.deleteCategoria.execute({
      id: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
