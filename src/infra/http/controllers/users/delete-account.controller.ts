import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { right } from 'src/core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { DeleteUserUseCase } from 'src/domain/use-cases/users/user-delete-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

@Controller('/accounts/:id')
export class DeleteAccountController {
  constructor(private deleteAccount: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') userId: string, @CurrentUser() user: UserPayload) {
    const userValidate = user.sub

    const result = await this.deleteAccount.execute({
      id: userId,
      userId: new UniqueEntityId(userValidate),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
