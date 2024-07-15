import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { RendaFactory } from 'test/factories/make-renda'

describe('Fetch total values renda (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let rendaFactory: RendaFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, RendaFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    rendaFactory = moduleRef.get(RendaFactory)

    await app.init()
  })

  test('[GET] /renda/sum/:userId', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      rendaFactory.makePrismaRenda({
        name: 'Salario',
        valor: 1200.0,
        userId: user.id,
      }),
      rendaFactory.makePrismaRenda({
        name: 'FreeLancer',
        valor: 1200.0,
        userId: user.id,
      }),
    ])

    const userId = user.id

    const response = await request(app.getHttpServer())
      .get(`/renda/sum/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.body).toEqual({
      renda: expect.arrayContaining([
        expect.objectContaining({ name: 'Salario' }),
        expect.objectContaining({ name: 'FreeLancer' }),
      ]),
      meta: {
        pageIndex: 1,
        perPage: 10,
        totalCount: 2,
        totalValue: 2400.0,
      },
    })
  })
})
