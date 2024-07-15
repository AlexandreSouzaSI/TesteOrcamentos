import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

export interface DespesasProps {
  name: string
  data?: string | null
  valor: number
  status: string
  dataVencimento?: string | null
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

  get status() {
    return this.props.status
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set data(data: string | null) {
    this.props.data = data
    this.touch()
  }

  set valor(valor: number) {
    this.props.valor = valor
    this.touch()
  }

  set dataVencimento(dataVencimento: string | null) {
    this.props.dataVencimento = dataVencimento
    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  static create(
    props: Optional<DespesasProps, 'createdAt' | 'status'>,
    id?: UniqueEntityId,
  ) {
    const despesa = new Despesas(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ? props.status : 'pendente',
        data: props.data ?? null,
        dataVencimento: props.data ?? null,
      },
      id,
    )

    return despesa
  }
}
