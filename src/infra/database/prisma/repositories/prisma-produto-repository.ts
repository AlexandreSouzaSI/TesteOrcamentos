import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Produto } from '@src/domain/entities/produto'
import { PrismaProdutoMapper } from '../mappers/prisma-produto-mapper'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepository {
  constructor(private prisma: PrismaService) {}

  async create(produto: Produto) {
    const data = PrismaProdutoMapper.toPrisma(produto)

    await this.prisma.produto.create({
      data,
    })
  }

  async findById(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: {
        id,
      },
    })

    if (!produto) {
      return null
    }

    return PrismaProdutoMapper.toDomain(produto)
  }

  async findByName(name: string) {
    const produto = await this.prisma.produto.findFirst({
      where: {
        name,
      },
    })

    if (!produto) {
      return null
    }

    return PrismaProdutoMapper.toDomain(produto)
  }

  async save(produto: Produto) {
    const data = PrismaProdutoMapper.toPrisma(produto)

    await this.prisma.produto.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(produto: Produto) {
    const data = PrismaProdutoMapper.toPrisma(produto)

    await this.prisma.produto.delete({
      where: {
        id: data.id,
      },
    })
  }
}
