import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { DespesasPresenter } from '../../presenters/despesas-presenter'
import { FetchDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-fetch-use-case'

@Controller('/despesas/:despesaId')
export class FetchDespesasController {
  constructor(private fetchnDespesasUseCase: FetchDespesasUseCase) {}

  @Get()
  async handle(@Param('despesaId') despesaId: string) {
    const result = await this.fetchnDespesasUseCase.execute({
      despesaId,
    })

    if (!result) {
      throw new Error()
    }

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const despesas = result.value.despesas

    if (!despesas) {
      throw new BadRequestException('Despesa not found')
    }

    return { despesa: DespesasPresenter.toHTTP(despesas) }
  }
}
