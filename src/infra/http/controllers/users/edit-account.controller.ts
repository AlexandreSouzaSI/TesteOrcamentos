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
import { EditUserUseCase } from 'src/domain/use-cases/users/user-edit-use-case'
import { right } from 'src/core/either'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

const editAccountBodySchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)

type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>

@Controller('/accounts/:userId')
export class EditAccountController {
  constructor(private editAccount: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, password } = body
    const userValidate = user.sub

    const result = await this.editAccount.execute({
      id: userId,
      name,
      password,
      userId: new UniqueEntityId(userValidate),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
