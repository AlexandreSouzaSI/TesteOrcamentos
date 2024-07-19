import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { DespesaFactory } from 'test/factories/make-despesa'

describe('Fetch total values despesa (E2E)', () => {
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

  test('[GET] /despesa/sum/:userId', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      despesaFactory.makePrismaDespesa({
        name: 'Salario',
        valor: 1200.0,
        userId: user.id,
        status: 'pendente',
      }),
      despesaFactory.makePrismaDespesa({
        name: 'FreeLancer',
        valor: 1200.0,
        userId: user.id,
        status: 'pago',
      }),
    ])

    // Teste sem passar status
    let response = await request(app.getHttpServer())
      .get(`/despesa/sum/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.body.totalSum.value).toEqual({
      despesa: 2400,
    })

    // Teste passando status
    response = await request(app.getHttpServer())
      .get(`/despesa/sum/${user.id}?status=pendente`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.body.totalSum.value).toEqual({
      despesa: 1200,
    })
  })
})
