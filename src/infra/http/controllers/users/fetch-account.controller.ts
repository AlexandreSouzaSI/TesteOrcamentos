import { Controller, Get } from '@nestjs/common'
import { FetchUserUseCase } from '@src/domain/use-cases/users/user-fetch-use-case'
import { UserPresenter } from '../../presenters/user-presenter'

@Controller('/accounts')
export class FetchAccountController {
  constructor(private userRepository: FetchUserUseCase) {}

  @Get()
  async getAllUsers() {
    const result = await this.userRepository.execute()

    if (result.isLeft()) {
      return { error: result.value.message }
    }

    const users = result.value.users
    return { users: UserPresenter.formatResponse(users) }
  }
}
