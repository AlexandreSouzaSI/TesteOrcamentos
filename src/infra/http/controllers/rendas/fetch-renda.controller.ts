import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FetchRendaUseCase } from 'src/domain/use-cases/rendas/renda-fetch-use-case'
import { RendaPresenter } from '../../presenters/renda-presenter'

@Controller('/renda/:rendaId')
export class FetchRendaController {
  constructor(private fetchRenda: FetchRendaUseCase) {}

  @Get()
  async handle(@Param('rendaId') rendaId: string) {
    const result = await this.fetchRenda.execute({
      rendaId,
    })

    if (!result) {
      throw new Error()
    }

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const renda = result.value.renda

    if (!renda) {
      throw new BadRequestException('Renda not found')
    }

    return { renda: RendaPresenter.toHTTP(renda) }
  }
}
