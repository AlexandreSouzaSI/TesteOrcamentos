import { Injectable } from '@nestjs/common'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { PrismaService } from '../prisma.service'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'
import { Despesas } from 'src/domain/entities/despesas'
import { PrismaDespesasMapper } from '../mappers/prisma-despesas-mapper'

interface WhereClause {
  userId: string
  status?: string
}

@Injectable()
export class PrismaDespesasRepository implements DespesasRepository {
  constructor(private prisma: PrismaService) {}

  async create(despesa: Despesas) {
    console.log('Despesa: ', despesa)
    const data = PrismaDespesasMapper.toPrisma(despesa)
    console.log('Data: ', data)

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

  async findCount(id: string) {
    const despesa = await this.prisma.despesas.count({
      where: {
        userId: id,
      },
    })

    if (!despesa) {
      return null
    }

    return despesa
  }

  async findManyRecent(
    { pageIndex }: PaginationParams,
    id: string,
    name?: string,
    status?: string,
    categoriaId?: string,
  ) {
    const despesas = await this.prisma.despesas.findMany({
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
    })

    return despesas.map(PrismaDespesasMapper.toDomain)
  }

  async sumDespesaValues(userId: string, status?: string): Promise<number> {
    const whereClause: WhereClause = { userId }
    if (status) {
      whereClause.status = status
    }

    const despesa = await this.prisma.despesas.findMany({ where: whereClause })
    const totalSum = despesa.reduce((sum, despesa) => {
      const valorNumeric = Number(despesa.valor)
      return sum + valorNumeric
    }, 0)

    return totalSum
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
