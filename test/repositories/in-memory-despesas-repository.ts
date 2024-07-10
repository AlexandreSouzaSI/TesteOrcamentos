import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Despesas } from 'src/domain/entities/despesas'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'

export class InMemoryDespesasRepository implements DespesasRepository {
  public items: Despesas[] = []

  async create(despesa: Despesas) {
    this.items.push(despesa)
  }

  async findById(id: string) {
    const despesa = this.items.find((item) => item.id.toString() === id)

    if (!despesa) {
      return null
    }

    return despesa
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const filteredDespesas = this.items.filter(
      (item) => item.userId.toString() === id,
    )

    const despesa = filteredDespesas
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return despesa
  }

  async save(despesa: Despesas) {
    const itemIndex = this.items.findIndex((item) => item.id === despesa.id)

    this.items[itemIndex] = despesa
  }

  async delete(despesa: Despesas) {
    const itemIndex = this.items.findIndex((item) => item.id === despesa.id)

    this.items.splice(itemIndex, 1)
  }
}
