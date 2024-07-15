import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { right } from 'src/core/either'
import { DeleteUserUseCase } from 'src/domain/use-cases/users/user-delete-use-case'

@Controller('/accounts/:id')
export class DeleteAccountController {
  constructor(private deleteAccount: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') userId: string) {
    const result = await this.deleteAccount.execute({
      id: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
