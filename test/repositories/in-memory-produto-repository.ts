import { Produto } from '@src/domain/entities/produto'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

export class InMemoryProdutoRepository implements ProdutoRepository {
  public items: Produto[] = []

  async create(produto: Produto) {
    this.items.push(produto)
  }

  async findById(id: string) {
    const produto = this.items.find((item) => item.id.toString() === id)

    if (!produto) {
      return null
    }

    return produto
  }

  async findByName(name: string) {
    const produto = this.items.find((item) => item.name === name)

    if (!produto) {
      return null
    }

    return produto
  }

  async findMany() {
    return this.items
  }

  async save(produto: Produto) {
    const itemIndex = this.items.findIndex((item) => item.id === produto.id)

    this.items[itemIndex] = produto
  }

  async delete(produto: Produto) {
    const itemIndex = this.items.findIndex((item) => item.id === produto.id)

    this.items.splice(itemIndex, 1)
  }
}
