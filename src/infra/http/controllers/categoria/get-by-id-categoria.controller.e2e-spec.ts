import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { CategoriaFactory } from '@test/factories/make-categoria'

describe('Get by id categoria (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let categoriaFactory: CategoriaFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, CategoriaFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    categoriaFactory = moduleRef.get(CategoriaFactory)

    await app.init()
  })

  test('[GET] /categoryName', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre Teste',
    })

    const categoria = await categoriaFactory.makePrismaCategoria({
      name: 'Salgados',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/category/${categoria.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Salgados',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      categoria: expect.objectContaining({ name: 'Salgados' }),
    })
  })
})
