import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/user'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

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
    console.log(id)
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
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }
}
