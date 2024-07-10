import { Injectable } from '@nestjs/common'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Renda } from 'src/domain/entities/renda'
import { RendaRepository } from 'src/domain/repositories/renda-repository'
import { PrismaService } from '../prisma.service'
import { PrismaRendaMapper } from '../mappers/prisma-renda-mapper'

@Injectable()
export class PrismaRendaRepository implements RendaRepository {
  constructor(private prisma: PrismaService) {}

  async create(renda: Renda) {
    const data = PrismaRendaMapper.toPrisma(renda)

    await this.prisma.renda.create({
      data,
    })
  }

  async findById(id: string) {
    const renda = await this.prisma.renda.findUnique({
      where: {
        id,
      },
    })

    if (!renda) {
      return null
    }

    return PrismaRendaMapper.toDomain(renda)
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const renda = await this.prisma.renda.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
      where: {
        userId: id,
      },
    })

    return renda.map(PrismaRendaMapper.toDomain)
  }

  async save(renda: Renda) {
    const data = PrismaRendaMapper.toPrisma(renda)

    await this.prisma.renda.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(renda: Renda) {
    const data = PrismaRendaMapper.toPrisma(renda)

    await this.prisma.renda.delete({
      where: {
        id: data.id,
      },
    })
  }
}
