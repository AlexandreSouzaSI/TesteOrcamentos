import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'

export class InMemoryCategoriaRepository implements CategoriaRepository {
  public items: Categoria[] = []

  async create(categoria: Categoria) {
    this.items.push(categoria)
  }

  async findById(id: string) {
    const categoria = this.items.find((item) => item.id.toString() === id)

    if (!categoria) {
      return null
    }

    return categoria
  }

  async findByName(name: string) {
    const categoria = this.items.find((item) => item.name === name)

    if (!categoria) {
      return null
    }

    return categoria
  }

  async save(categoria: Categoria) {
    const itemIndex = this.items.findIndex((item) => item.id === categoria.id)

    this.items[itemIndex] = categoria
  }

  async delete(categoria: Categoria) {
    const itemIndex = this.items.findIndex((item) => item.id === categoria.id)

    this.items.splice(itemIndex, 1)
  }
}
