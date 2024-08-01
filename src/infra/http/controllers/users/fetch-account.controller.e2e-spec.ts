import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'

describe('Fetch accounts (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[GET] /accounts', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre Teste',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/accounts`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      value: {
        users: expect.arrayContaining([
          expect.objectContaining({
            props: expect.objectContaining({
              name: 'Alexandre Teste',
            }),
          }),
        ]),
      },
    })
  })
})
