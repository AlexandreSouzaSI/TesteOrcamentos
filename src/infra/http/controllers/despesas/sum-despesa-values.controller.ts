import { Controller, Get, Param, Query } from '@nestjs/common'
import { SumDespesaUseCase } from 'src/domain/use-cases/despesas/despesa-sum-values-use-case'

@Controller('/despesa/sum/:userId')
export class SumDespesaController {
  constructor(private readonly sumDespesaUseCase: SumDespesaUseCase) {}

  @Get()
  async sumRenda(
    @Param('userId') userId: string,
    @Query('status') status: string,
  ) {
    const totalSum = await this.sumDespesaUseCase.execute({ userId, status })

    return { totalSum }
  }
}
