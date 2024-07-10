import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Edit account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /accounts/:userId', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const userId = user.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/accounts/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Alexandre Atualizado',
      })

    expect(response.statusCode).toBe(204)

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        name: 'Alexandre Atualizado',
      },
    })

    expect(userOnDatabase).toBeTruthy()

    expect(userOnDatabase).toEqual(
      expect.objectContaining({
        id: userOnDatabase?.id.toString(),
      }),
    )
  })
})
