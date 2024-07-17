import { PrismaService } from '@src/infra/database/prisma/prisma.service'
import { User } from 'src/domain/entities/user'
import { UserRepository } from 'src/domain/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
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
    const rendas = await this.prisma.renda.findMany({ where: { userId: id } })
    const rendasSum = rendas.reduce(
      (sum, renda) => sum + Number(renda.valor),
      0,
    )

    const despesas = await this.prisma.despesas.findMany({
      where: { userId: id },
    })
    const despesasSum = despesas.reduce(
      (sum, despesa) => sum + Number(despesa.valor),
      0,
    )

    const difference = rendasSum - despesasSum

    return difference
  }
}
