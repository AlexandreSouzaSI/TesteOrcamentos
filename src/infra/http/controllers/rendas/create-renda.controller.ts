import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { CreateRendaUseCase } from 'src/domain/use-cases/rendas/renda-create-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

const createRendaBodySchema = z.object({
  name: z.string(),
  data: z.date().optional(),
  valor: z.coerce.number(),
})

const bodyValidationPipe = new ZodValidationPipe(createRendaBodySchema)

type CreateRendaBodySchema = z.infer<typeof createRendaBodySchema>

@Controller('/renda')
export class CreateRendaController {
  constructor(private createRenda: CreateRendaUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateRendaBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, valor, data } = body
    const userValidate = user.sub

    const result = await this.createRenda.execute({
      userId: new UniqueEntityId(userValidate),
      name,
      valor,
      data,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
