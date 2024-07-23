import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

export interface DespesasProps {
  name: string
  data?: string | null
  valor?: number | null
  status?: string | null
  dataVencimento?: string | null
  quantidade?: number | null
  valorUnitario?: number | null
  createdAt: Date
  updatedAt?: Date | null
  categoriaId?: string | null
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
    return this.props.valor ?? null
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
    return this.props.status ?? null
  }

  get quantidade() {
    return this.props.quantidade ?? null
  }

  get valorUnitario() {
    return this.props.valorUnitario ?? null
  }

  get categoriaId() {
    return this.props.categoriaId ?? null
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

  set valor(valor: number | null) {
    this.props.valor = valor
    this.touch()
  }

  set dataVencimento(dataVencimento: string | null) {
    this.props.dataVencimento = dataVencimento
    this.touch()
  }

  set status(status: string | null) {
    this.props.status = status
    this.touch()
  }

  set quantidade(quantidade: number | null) {
    this.props.quantidade = quantidade
    this.touch()
  }

  set valorUnitario(valorUnitario: number | null) {
    this.props.valorUnitario = valorUnitario
    this.touch()
  }

  set categoriaId(categoriaId: string | null) {
    this.props.categoriaId = categoriaId
    this.touch()
  }

  static create(
    props: Optional<DespesasProps, 'createdAt' | 'status'>,
    id?: UniqueEntityId,
  ) {
    if (props.valor === null || props.valor === undefined) {
      props.valor = 0

      const calculatedValor =
        props.quantidade && props.valorUnitario
          ? props.quantidade * props.valorUnitario + props.valor
          : props.valor

      const despesa = new Despesas(
        {
          ...props,
          createdAt: props.createdAt ?? new Date(),
          status: props.status ? props.status : 'pendente',
          data: props.data ?? null,
          categoriaId: props.categoriaId ? props.categoriaId : null,
          valor: calculatedValor,
        },
        id,
      )

      return despesa
    }

    const despesa = new Despesas(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ? props.status : 'pendente',
        data: props.data ?? null,
        categoriaId: props.categoriaId ? props.categoriaId : null,
        valor: props.valor,
      },
      id,
    )

    return despesa
  }
}
