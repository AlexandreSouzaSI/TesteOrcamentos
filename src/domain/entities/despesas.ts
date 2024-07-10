import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

export interface DespesasProps {
  name: string
  data?: Date | null
  valor: number
  dataVencimento?: Date | null
  createdAt: Date
  updatedAt?: Date | null
  userId: UniqueEntityId
}

export class Despesas extends Entity<DespesasProps> {
  get name() {
    return this.props.name
  }

  get data() {
    return this.props.data ?? null
  }

  get valor() {
    return this.props.valor
  }

  get dataVencimento() {
    return this.props.dataVencimento ?? null
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get userId() {
    return this.props.userId
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set data(data: Date | null) {
    this.props.data = data
    this.touch()
  }

  set valor(valor: number) {
    this.props.valor = valor
    this.touch()
  }

  set dataVencimento(dataVencimento: Date | null) {
    this.props.dataVencimento = dataVencimento
    this.touch()
  }

  static create(
    props: Optional<DespesasProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const despesa = new Despesas(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        data: props.data ?? null,
        dataVencimento: props.data ?? null,
      },
      id,
    )

    return despesa
  }
}
