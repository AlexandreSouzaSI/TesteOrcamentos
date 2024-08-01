import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-fetch-use-case'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { right } from '@src/core/either'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const nameQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type NameQueryParamSchema = z.infer<typeof nameQueryParamSchema>

@Controller('/category')
export class FetchCategoriaController {
  constructor(private fetchCategoria: FetchCategoriaUseCase) {}

  @Get()
  async handle(
    @Query('pageIndex', queryValidationPipe)
    pageIndex: PageQueryParamSchema,
    @Query('name') name: NameQueryParamSchema,
  ) {
    const result = await this.fetchCategoria.execute({ pageIndex, name })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const totalCount = result.value.categoria.length

    const categoria = result.value.categoria

    return right({
      categoria: categoria.map((r) => ({
        id: r.id.toString(),
        name: r.name,
      })),
      meta: {
        pageIndex,
        perPage: 10,
        totalCount,
      },
    })
  }
}
