import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/user'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        despesas: true,
        rendas: true,
      },
    })

    return users.map((user) => PrismaUserMapper.toDomain(user))
  }

  async create(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        despesas: true,
        rendas: true,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        despesas: true,
        rendas: true,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async save(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async difference(id: string) {
    const rendas = await this.prisma.renda.findMany({ where: { userId: id } })
    const rendasSum = rendas.reduce((sum, renda) => {
      const valorNumeric = Number(renda.valor)
      return sum + valorNumeric
    }, 0)

    const despesa = await this.prisma.despesas.findMany({
      where: { userId: id },
    })
    const despesaSum = despesa.reduce((sum, despesa) => {
      const valorNumeric = Number(despesa.valor)
      return sum + valorNumeric
    }, 0)

    const diference = rendasSum - despesaSum

    return diference
  }

  async delete(user: User) {
    const userId = user.id.toString()

    await this.prisma.$transaction([
      this.prisma.renda.deleteMany({ where: { userId } }),
      this.prisma.despesas.deleteMany({ where: { userId } }),
      this.prisma.user.delete({ where: { id: userId } }),
    ])
  }
}
