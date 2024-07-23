import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Produto, ProdutoProps } from '@src/domain/entities/produto'
import { PrismaProdutoMapper } from '@src/infra/database/prisma/mappers/prisma-produto-mapper'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeProduto(
  override: Partial<ProdutoProps> = {},
  id?: UniqueEntityId,
) {
  const produto = Produto.create(
    {
      name: faker.person.firstName(),
      quantidadeEstoque: faker.number.int(),
      quantidadeMinima: faker.number.int(),
      ...override,
    },
    id,
  )

  return produto
}

@Injectable()
export class ProdutoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProduto(data: Partial<ProdutoProps> = {}): Promise<Produto> {
    const produto = makeProduto(data)

    await this.prisma.produto.create({
      data: PrismaProdutoMapper.toPrisma(produto),
    })

    return produto
  }
}
