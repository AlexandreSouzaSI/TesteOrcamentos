import {
  User as PrismaUser,
  Despesas as PrismaDespesas,
  Renda as PrismaRenda,
  Prisma,
} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domain/entities/user'
import { PrismaRendaMapper } from './prisma-renda-mapper'
import { PrismaDespesasMapper } from './prisma-despesas-mapper'

export class PrismaUserMapper {
  static toDomain(
    raw: PrismaUser & { despesas: PrismaDespesas[]; rendas: PrismaRenda[] },
  ): User {
    const despesas = raw.despesas.map((despesa) =>
      PrismaDespesasMapper.toDomain(despesa),
    )
    const rendas = raw.rendas.map((renda) => PrismaRendaMapper.toDomain(renda))

    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        despesas,
        rendas,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
