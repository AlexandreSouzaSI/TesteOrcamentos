import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { User, UserProps } from 'src/domain/entities/user'
import { PrismaUserMapper } from 'src/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    return user
  }
}
