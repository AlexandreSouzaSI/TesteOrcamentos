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
  ) {
    const { name, password } = body

    const result = await this.editAccount.execute({
      id: userId,
      name,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
