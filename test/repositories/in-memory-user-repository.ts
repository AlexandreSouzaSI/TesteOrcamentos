import { User } from 'src/domain/entities/user'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { Renda } from 'src/domain/entities/renda'
import { Despesas } from '@src/domain/entities/despesas'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []
  public rendas: Renda[] = []
  public despesas: Despesas[] = []

  async create(user: User) {
    this.items.push(user)
  }

  async findMany(): Promise<User[]> {
    return this.items
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async delete(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items.splice(itemIndex, 1)
  }

  async difference(id: string) {
    const rendasSum = this.rendas
      .filter((renda) => renda.userId.toString() === id)
      .reduce((sum, renda) => sum + Number(renda.valor), 0)

    const despesasSum = this.despesas
      .filter((despesa) => despesa.userId.toString() === id)
      .reduce((sum, despesa) => sum + Number(despesa.valor), 0)

    const difference = rendasSum - despesasSum

    return difference
  }
}
