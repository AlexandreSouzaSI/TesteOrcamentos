import { Controller, Get, Param } from '@nestjs/common'
import { SumRendaUseCase } from 'src/domain/use-cases/rendas/renda-sum-values-use-case'

@Controller('/renda/sum/:userId')
export class SumRendaController {
  constructor(private sumRendaUseCase: SumRendaUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const totalSum = await this.sumRendaUseCase.execute({ userId })
    return { totalSum }
  }
}
