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

  async delete(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }
}
