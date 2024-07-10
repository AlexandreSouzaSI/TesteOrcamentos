import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { RendaFactory } from 'test/factories/make-renda'

describe('Fetch recent renda (E2E)', () => {
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

  test('[GET] /renda', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      rendaFactory.makePrismaRenda({
        name: 'Salario',
        valor: 12000.0,
        userId: user.id,
      }),
      rendaFactory.makePrismaRenda({
        name: 'FreeLancer',
        valor: 1200.0,
        userId: user.id,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/renda')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      renda: expect.arrayContaining([
        expect.objectContaining({ name: 'Salario' }),
        expect.objectContaining({ name: 'FreeLancer' }),
      ]),
    })
  })
})
