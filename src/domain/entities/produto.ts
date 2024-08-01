import { Optional } from '@src/core/types/optional'
import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Categoria } from './categoria'

export interface ProdutoProps {
  name: string
  quantidadeEstoque?: number | null
  quantidadeMinima?: number | null
  categoriaId?: string | null
  createdAt: Date
  updatedAt?: Date | null
  categoria?: Categoria
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

  get categoria() {
    return this.props.categoria ?? undefined
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

  set categoria(categoria: Categoria | undefined) {
    this.props.categoria = categoria
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
        categoria: props.categoria ? props.categoria : undefined,
      },
      id,
    )

    return categoria
  }
}
