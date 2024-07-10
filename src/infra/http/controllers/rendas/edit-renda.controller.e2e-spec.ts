import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'
import { RendaFactory } from 'test/factories/make-renda'
import { UserFactory } from 'test/factories/make-user'

describe('Edit renda (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let rendaFactory: RendaFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, RendaFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    rendaFactory = moduleRef.get(RendaFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /renda/:rendaId', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const renda = await rendaFactory.makePrismaRenda({
      userId: user.id,
    })

    const rendaId = renda.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/renda/${rendaId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Renda Atualizada',
        valor: 100,
      })

    expect(response.statusCode).toBe(204)

    const rendaOnDatabase = await prisma.renda.findFirst({
      where: {
        name: 'Renda Atualizada',
        valor: 100,
      },
    })

    expect(rendaOnDatabase).toBeTruthy()

    expect(rendaOnDatabase).toEqual(
      expect.objectContaining({
        id: rendaOnDatabase?.id.toString(),
      }),
    )
  })
})
