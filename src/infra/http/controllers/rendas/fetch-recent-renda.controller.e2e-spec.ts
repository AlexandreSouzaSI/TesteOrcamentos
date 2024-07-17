import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { RendaFactory } from 'test/factories/make-renda'

describe('Fetch recent rendas (E2E)', () => {
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

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /renda - Paginated', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    for (let i = 1; i <= 22; i++) {
      await rendaFactory.makePrismaRenda({
        name: `Renda ${i}`,
        valor: 1,
        userId: user.id,
      })
    }

    // Testando a primeira página
    const responsePage1 = await request(app.getHttpServer())
      .get('/renda?pageIndex=1&perPage=10') // Alterado para /rendas
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(responsePage1.statusCode).toBe(200)
    expect(responsePage1.body.value.renda.length).toBe(10) // Alterado para rendas
    expect(responsePage1.body.value.meta).toEqual({
      pageIndex: 1,
      perPage: 10,
      totalCount: 22,
      totalValue: 22,
    })

    // Testando a segunda página
    const responsePage2 = await request(app.getHttpServer())
      .get('/renda?pageIndex=2&perPage=10') // Alterado para /rendas
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(responsePage2.statusCode).toBe(200)
    expect(responsePage2.body.value.renda.length).toBe(10) // Alterado para rendas
    expect(responsePage2.body.value.meta).toEqual({
      pageIndex: 2,
      perPage: 10,
      totalCount: 22,
      totalValue: 22,
    })

    // Testando a terceira página
    const responsePage3 = await request(app.getHttpServer())
      .get('/renda?pageIndex=3&perPage=10') // Alterado para /rendas
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(responsePage3.statusCode).toBe(200)
    expect(responsePage3.body.value.renda.length).toBe(2) // Alterado para rendas
    expect(responsePage3.body.value.meta).toEqual({
      pageIndex: 3,
      perPage: 10,
      totalCount: 22,
      totalValue: 22,
    })
  })
})
