import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { ProdutoFactory } from '@test/factories/make-produto'

describe('Fetch produto (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let produtoFactory: ProdutoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, ProdutoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    produtoFactory = moduleRef.get(ProdutoFactory)

    await app.init()
  })

  test('[GET] /product/:id', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre Teste',
    })

    const produto = await produtoFactory.makePrismaProduto({
      name: 'Salgados',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/product/${produto.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      produto: expect.objectContaining({ name: 'Salgados' }),
    })
  })
})
