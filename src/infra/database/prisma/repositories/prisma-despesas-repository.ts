import { Injectable } from '@nestjs/common'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { PrismaService } from '../prisma.service'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'
import { Despesas } from 'src/domain/entities/despesas'
import { PrismaDespesasMapper } from '../mappers/prisma-despesas-mapper'

@Injectable()
export class PrismaDespesasRepository implements DespesasRepository {
  constructor(private prisma: PrismaService) {}

  async create(despesa: Despesas) {
    const data = PrismaDespesasMapper.toPrisma(despesa)

    await this.prisma.despesas.create({
      data,
    })
  }

  async findById(id: string) {
    const despesa = await this.prisma.despesas.findUnique({
      where: {
        id,
      },
    })

    if (!despesa) {
      return null
    }

    return PrismaDespesasMapper.toDomain(despesa)
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const despesas = await this.prisma.despesas.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
      where: {
        userId: id,
      },
    })

    return despesas.map(PrismaDespesasMapper.toDomain)
  }

  async save(despesa: Despesas) {
    const data = PrismaDespesasMapper.toPrisma(despesa)

    await this.prisma.despesas.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(despesa: Despesas) {
    const data = PrismaDespesasMapper.toPrisma(despesa)

    await this.prisma.despesas.delete({
      where: {
        id: data.id,
      },
    })
  }
}
