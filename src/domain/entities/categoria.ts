import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'

export interface CategoriaProps {
  name: string
}

export class Categoria extends Entity<CategoriaProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: CategoriaProps, id?: UniqueEntityId) {
    const categoria = new Categoria(
      {
        ...props,
      },
      id,
    )

    return categoria
  }
}
