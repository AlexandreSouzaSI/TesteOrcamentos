import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchRecentDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-fetch-recent-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { DespesasPresenter } from '../../presenters/despesas-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/despesas')
export class FetchRecentDespesasController {
  constructor(private fetchRecenDespesas: FetchRecentDespesasUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.fetchRecenDespesas.execute({
      page,
      userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const despesas = result.value.despesas

    return { despesa: despesas.map(DespesasPresenter.toHTTP) }
  }
}
