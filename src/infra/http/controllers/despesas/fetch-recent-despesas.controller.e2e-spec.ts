import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { DespesaFactory } from 'test/factories/make-despesa'

describe('Fetch recent despesas (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let despesaFactory: DespesaFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, DespesaFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    despesaFactory = moduleRef.get(DespesaFactory)

    await app.init()
  })

  test('[GET] /despesas', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      despesaFactory.makePrismaDespesa({
        name: 'Conta de Luz',
        valor: 120.0,
        userId: user.id,
      }),
      despesaFactory.makePrismaDespesa({
        name: 'Conta de Agua',
        valor: 120.0,
        userId: user.id,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/despesas')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      despesa: expect.arrayContaining([
        expect.objectContaining({ name: 'Conta de Luz' }),
        expect.objectContaining({ name: 'Conta de Agua' }),
      ]),
    })
  })
})
