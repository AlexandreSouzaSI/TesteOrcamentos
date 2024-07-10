import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteRendaUseCase } from 'src/domain/use-cases/rendas/renda-delete-use-case'

@Controller('/renda/:rendaId')
export class DeleteRendaController {
  constructor(private deleteRenda: DeleteRendaUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('rendaId') rendaId: string) {
    const result = await this.deleteRenda.execute({
      rendaId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
