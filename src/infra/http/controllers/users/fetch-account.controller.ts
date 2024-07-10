import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FetchUserUseCase } from 'src/domain/use-cases/users/user-fetch-use-case'
import { UserPresenter } from '../../presenters/user-presenter'

@Controller('/accounts/:userId')
export class FetchAccountController {
  constructor(private fetchAccount: FetchUserUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const account = await this.fetchAccount.execute({
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

    return { renda: UserPresenter.toHTTP(user) }
  }
}
