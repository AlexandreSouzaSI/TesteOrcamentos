import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-delete-use-case'

@Controller('/despesa/:despesaId')
export class DeleteDespesasController {
  constructor(private deleteDespesas: DeleteDespesasUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('despesaId') despesaId: string) {
    console.log('aqui: ', despesaId)
    const result = await this.deleteDespesas.execute({
      despesaId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
