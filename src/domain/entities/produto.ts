import { Optional } from '@src/core/types/optional'
import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'

export interface ProdutoProps {
  name: string
  quantidadeEstoque?: number | null
  quantidadeMinima?: number | null
  categoriaId?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Produto extends Entity<ProdutoProps> {
  get name() {
    return this.props.name
  }

  get quantidadeEstoque() {
    return this.props.quantidadeEstoque ?? null
  }

  get quantidadeMinima() {
    return this.props.quantidadeMinima ?? null
  }

  get categoriaId() {
    return this.props.categoriaId ?? null
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set quantidadeEstoque(quantidadeEstoque: number | null) {
    this.props.quantidadeEstoque = quantidadeEstoque
    this.touch()
  }

  set quantidadeMinima(quantidadeMinima: number | null) {
    this.props.quantidadeMinima = quantidadeMinima
    this.touch()
  }

  set categoriaId(categoriaId: string | null) {
    this.props.categoriaId = categoriaId
    this.touch()
  }

  static create(
    props: Optional<ProdutoProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const categoria = new Produto(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return categoria
  }
}
