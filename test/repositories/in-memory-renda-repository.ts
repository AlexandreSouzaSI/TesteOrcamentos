import Decimal from 'decimal.js'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Renda } from 'src/domain/entities/renda'
import { RendaRepository } from 'src/domain/repositories/renda-repository'

export class InMemoryRendaRepository implements RendaRepository {
  public items: Renda[] = []

  async create(renda: Renda) {
    this.items.push(renda)
  }

  async findById(id: string) {
    const renda = this.items.find((item) => item.id.toString() === id)

    if (!renda) {
      return null
    }

    return renda
  }

  async findCount(id: string) {
    const renda = this.items.filter(
      (item) => item.userId.toString() === id,
    ).length

    if (!renda) {
      return null
    }

    console.log(renda)
    return renda
  }

  async findManyRecent({ pageIndex }: PaginationParams, id: string) {
    const filteredRenda = this.items.filter(
      (item) => item.userId.toString() === id,
    )

    const renda = filteredRenda
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((pageIndex - 1) * 20, pageIndex * 20)

    return renda
  }

  async sumRendaValues(userId: string): Promise<number> {
    const rendas = this.items.filter(
      (item) => item.userId.toString() === userId,
    )

    const totalSum = rendas.reduce((sum, renda) => {
      return new Decimal(sum).add(renda.valor).toNumber()
    }, 0)

    return totalSum
  }

  async save(renda: Renda) {
    const itemIndex = this.items.findIndex((item) => item.id === renda.id)

    this.items[itemIndex] = renda
  }

  async delete(renda: Renda) {
    const itemIndex = this.items.findIndex((item) => item.id === renda.id)

    this.items.splice(itemIndex, 1)
  }
}
