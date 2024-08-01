import { User } from 'src/domain/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      despesas: user.despesas,
      rendas: user.rendas,
    }
  }

  static formatResponse(users: User[]) {
    return users.map(UserPresenter.toHTTP)
  }
}
