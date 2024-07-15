import { CountRendaUseCase } from './../../../../domain/use-cases/rendas/renda-count-use-case'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchRecentRendaUseCase } from 'src/domain/use-cases/rendas/renda-fetch-recent-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { right } from 'src/core/either'
import { SumRendaUseCase } from 'src/domain/use-cases/rendas/renda-sum-values-use-case'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const nameQueryParamSchema = z.string().optional()
const statusQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type NameQueryParamSchema = z.infer<typeof nameQueryParamSchema>
type StatusQueryParamSchema = z.infer<typeof statusQueryParamSchema>

@Controller('/renda')
export class FetchRecentRendaController {
  constructor(
    private fetchRecentRenda: FetchRecentRendaUseCase,
    private countRenda: CountRendaUseCase,
    private sumRenda: SumRendaUseCase,
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe)
    pageIndex: PageQueryParamSchema,
    @Query('name') name: NameQueryParamSchema,
    @Query('status') status: StatusQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const Rendaresult = await this.fetchRecentRenda.execute({
      userId,
      pageIndex,
      name,
      status,
    })

    if (Rendaresult.isLeft()) {
      throw new BadRequestException()
    }

    const countResult = await this.countRenda.execute({ userId })
    const sumResult = await this.sumRenda.execute({ userId })

    if (countResult.isLeft()) {
      throw new BadRequestException()
    }

    const renda = Rendaresult.value.renda

    const totalCount = countResult.value.renda
    const totalValue = sumResult.value?.renda

    return right({
      renda: renda.map((r) => ({
        id: r.id.toString(),
        name: r.name,
        data: r.data,
        valor: r.valor,
        status: r.status,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        userId: r.userId.toString(),
      })),
      meta: {
        pageIndex,
        perPage: 10,
        totalCount,
        totalValue,
      },
    })
  }
}
