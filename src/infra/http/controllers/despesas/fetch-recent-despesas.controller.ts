import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchRecentDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-fetch-recent-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CountDespesaUseCase } from 'src/domain/use-cases/despesas/despesa-count-use-case'
import { right } from 'src/core/either'
import { SumDespesaUseCase } from 'src/domain/use-cases/despesas/despesa-sum-values-use-case'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const nameQueryParamSchema = z.string().optional()
const statusQueryParamSchema = z.string().optional()
const categoriaIdQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type NameQueryParamSchema = z.infer<typeof nameQueryParamSchema>
type StatusQueryParamSchema = z.infer<typeof statusQueryParamSchema>
type CategoriaQueryParamSchema = z.infer<typeof categoriaIdQueryParamSchema>

@Controller('/despesas')
export class FetchRecentDespesasController {
  constructor(
    private fetchRecenDespesas: FetchRecentDespesasUseCase,
    private countDespesa: CountDespesaUseCase,
    private sumDespesa: SumDespesaUseCase,
  ) {}

  @Get()
  async handle(
    @Query('pageIndex', queryValidationPipe)
    pageIndex: PageQueryParamSchema,
    @Query('name') name: NameQueryParamSchema,
    @Query('status') status: StatusQueryParamSchema,
    @Query('categoriaId') categoriaId: CategoriaQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.fetchRecenDespesas.execute({
      userId,
      pageIndex,
      name,
      categoriaId,
      status,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const countResult = await this.countDespesa.execute({ userId })
    const sumResult = await this.sumDespesa.execute({ userId })

    if (countResult.isLeft()) {
      throw new BadRequestException()
    }

    const despesa = result.value.despesas

    const totalCount = countResult.value.despesa
    const totalValue = sumResult.value?.despesa

    console.log('despesa: ', despesa)
    console.log('totalCount: ', totalCount)
    console.log('totalValue: ', totalValue)

    return right({
      despesas: despesa.map((r) => ({
        id: r.id.toString(),
        name: r.name,
        data: r.data,
        valor: r.valor,
        status: r.status,
        quantidade: r.quantidade,
        valorUnitario: r.valorUnitario,
        categoriaId: r.categoriaId,
        dataVencimento: r.dataVencimento,
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
