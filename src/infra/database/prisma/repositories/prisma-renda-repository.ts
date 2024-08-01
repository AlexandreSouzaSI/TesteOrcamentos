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

  async findCount(id: string) {
    const renda = await this.prisma.renda.count({
      where: {
        userId: id,
      },
    })

    if (!renda) {
      return null
    }

    return renda
  }

  async findManyRecent(
    { pageIndex }: PaginationParams,
    id: string,
    name?: string,
    status?: string,
    categoriaId?: string,
  ) {
    const renda = await this.prisma.renda.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (pageIndex - 1) * 10,
      where: {
        userId: id,
        ...(name && { name: { contains: name } }),
        ...(status && { status }),
        ...(categoriaId && { categoriaId }),
      },
      include: {
        categoria: true,
      },
    })

    return renda.map(PrismaRendaMapper.toDomain)
  }

  async sumRendaValues(userId: string): Promise<number> {
    const rendas = await this.prisma.renda.findMany({ where: { userId } })
    const totalSum = rendas.reduce((sum, renda) => {
      const valorNumeric = Number(renda.valor)
      return sum + valorNumeric
    }, 0)

    return totalSum
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
