import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { CategoriaFactory } from '@test/factories/make-categoria'
import { UserFactory } from '@test/factories/make-user'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'

describe('Edit categoria (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let categoriaFactory: CategoriaFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CategoriaFactory, UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    categoriaFactory = moduleRef.get(CategoriaFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /category/:id', async () => {
    const categoria = await categoriaFactory.makePrismaCategoria({
      name: 'Sorvete',
    })

    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/category/${categoria.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Sorvete atualizado',
      })

    expect(response.statusCode).toBe(204)

    const categoriaOnDatabase = await prisma.categoria.findFirst({
      where: {
        name: 'Sorvete atualizado',
      },
    })

    expect(categoriaOnDatabase).toBeTruthy()

    expect(categoriaOnDatabase).toEqual(
      expect.objectContaining({
        id: categoriaOnDatabase?.id.toString(),
      }),
    )
  })
})
