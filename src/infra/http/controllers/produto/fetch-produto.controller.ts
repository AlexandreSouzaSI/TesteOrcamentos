import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchProdutoUseCase } from '@src/domain/use-cases/produtos/produto-fetch-use-case'
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
const categoriaIdQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type NameQueryParamSchema = z.infer<typeof nameQueryParamSchema>
type CategoriaQueryParamSchema = z.infer<typeof categoriaIdQueryParamSchema>

@Controller('/produtos')
export class FetchProdutoController {
  constructor(private fetchProduto: FetchProdutoUseCase) {}

  @Get()
  async handle(
    @Query('pageIndex', queryValidationPipe)
    pageIndex: PageQueryParamSchema,
    @Query('name') name: NameQueryParamSchema,
    @Query('categoriaId') categoriaId: CategoriaQueryParamSchema,
  ) {
    const result = await this.fetchProduto.execute({
      pageIndex,
      categoriaId,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const produtos = result.value.produto

    const totalCount = result.value.produto.length

    return right({
      produto: produtos.map((r) => ({
        id: r.id.toString(),
        name: r.name,
        quantidadeMinima: r.quantidadeMinima,
        quantidadeEstoque: r.quantidadeEstoque,
        categoriaId: r.categoriaId,
        categoria: r.categoria?.name,
      })),
      meta: {
        pageIndex,
        perPage: 10,
        totalCount,
      },
    })
  }
}
