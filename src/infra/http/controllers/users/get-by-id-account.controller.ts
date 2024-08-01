import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { UserPresenter } from '../../presenters/user-presenter'
import { GetByIdUserUseCase } from '@src/domain/use-cases/users/user-get-by-id-use-case'

@Controller('/accounts/:userId')
export class GetByIdAccountController {
  constructor(private getByIdAccount: GetByIdUserUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const account = await this.getByIdAccount.execute({
      userId,
    })

    if (!account) {
      throw new Error()
    }

    if (account.isLeft()) {
      throw new BadRequestException()
    }

    const user = account.value.user

    if (!user) {
      throw new BadRequestException('User not found')
    }

    return { user: UserPresenter.toHTTP(user) }
  }
}
