import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { EditDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-edit-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

const editDespesasBodySchema = z.object({
  name: z.string().optional(),
  data: z.string().optional(),
  valor: z.number().optional(),
  dataVencimento: z.string().optional(),
  status: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editDespesasBodySchema)

type EditDespesasBodySchema = z.infer<typeof editDespesasBodySchema>

@Controller('/despesa/:id')
export class EditDespesasController {
  constructor(private editDespesas: EditDespesasUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditDespesasBodySchema,
    @Param('id') despesaId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, valor, data, dataVencimento, status } = body
    const userValidate = user.sub

    const result = await this.editDespesas.execute({
      name,
      valor,
      data,
      status,
      dataVencimento,
      despesaId,
      userId: new UniqueEntityId(userValidate),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
