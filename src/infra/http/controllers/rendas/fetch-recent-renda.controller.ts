import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchRecentRendaUseCase } from 'src/domain/use-cases/rendas/renda-fetch-recent-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { RendaPresenter } from '../../presenters/renda-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/renda')
export class FetchRecentRendaController {
  constructor(private fetchRecentRenda: FetchRecentRendaUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe)
    page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.fetchRecentRenda.execute({
      userId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const renda = result.value.renda

    return { renda: renda.map(RendaPresenter.toHTTP) }
  }
}
