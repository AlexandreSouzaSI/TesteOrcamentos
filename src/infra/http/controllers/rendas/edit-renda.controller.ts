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
import { EditRendaUseCase } from 'src/domain/use-cases/rendas/renda-edit-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

const editRendaBodySchema = z.object({
  name: z.string().optional(),
  data: z.string().optional(),
  valor: z.coerce.number().optional(),
  status: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editRendaBodySchema)

type EditRendaBodySchema = z.infer<typeof editRendaBodySchema>

@Controller('/renda/:rendaId')
export class EditRendaController {
  constructor(private editRenda: EditRendaUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditRendaBodySchema,
    @Param('rendaId') rendaId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, valor, data, status } = body
    const userValidate = user.sub

    const result = await this.editRenda.execute({
      name,
      valor,
      data,
      status,
      rendaId,
      userId: new UniqueEntityId(userValidate),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
