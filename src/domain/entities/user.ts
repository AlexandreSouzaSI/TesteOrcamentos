import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Despesas } from './despesas'
import { Renda } from './renda'

export interface UserProps {
  name: string
  email: string
  password: string
  despesas?: Despesas[]
  rendas?: Renda[]
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get despesas() {
    return this.props.despesas
  }

  get rendas() {
    return this.props.rendas
  }

  set name(name: string) {
    this.props.name = name
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
      },
      id,
    )

    return user
  }
}
