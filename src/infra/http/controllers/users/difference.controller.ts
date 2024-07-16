import { Controller, Get, Param } from '@nestjs/common'
import { DifferenceUseCase } from 'src/domain/use-cases/users/user-difference-use-case'

@Controller('/difference/:userId')
export class DifferenceController {
  constructor(private readonly differenceUseCase: DifferenceUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const totalSum = await this.differenceUseCase.execute({ userId })
    return { totalSum }
  }
}
