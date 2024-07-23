import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCategoriaMapper } from '../mappers/prisma-categoria-mapper'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'

@Injectable()
export class PrismaCategoriaRepository implements CategoriaRepository {
  constructor(private prisma: PrismaService) {}

  async create(categoria: Categoria) {
    const data = PrismaCategoriaMapper.toPrisma(categoria)

    await this.prisma.categoria.create({
      data,
    })
  }

  async findById(id: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: {
        id,
      },
    })

    if (!categoria) {
      return null
    }

    return PrismaCategoriaMapper.toDomain(categoria)
  }

  async findByName(name: string) {
    const categoria = await this.prisma.categoria.findFirst({
      where: {
        name,
      },
    })

    if (!categoria) {
      return null
    }

    return PrismaCategoriaMapper.toDomain(categoria)
  }

  async save(categoria: Categoria) {
    const data = PrismaCategoriaMapper.toPrisma(categoria)

    await this.prisma.categoria.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(categoria: Categoria) {
    const data = PrismaCategoriaMapper.toPrisma(categoria)

    await this.prisma.categoria.delete({
      where: {
        id: data.id,
      },
    })
  }
}
