import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { ProdutoFactory } from '@test/factories/make-produto'
import { UserFactory } from '@test/factories/make-user'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'

describe('Edit produto (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let produtoFactory: ProdutoFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProdutoFactory, UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    produtoFactory = moduleRef.get(ProdutoFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /product/:id', async () => {
    const produto = await produtoFactory.makePrismaProduto({
      name: 'Spaten',
    })

    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/product/${produto.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Spaten atualizado',
      })

    expect(response.statusCode).toBe(204)

    const produtoOnDatabase = await prisma.produto.findFirst({
      where: {
        name: 'Spaten atualizado',
      },
    })

    expect(produtoOnDatabase).toBeTruthy()

    expect(produtoOnDatabase).toEqual(
      expect.objectContaining({
        id: produtoOnDatabase?.id.toString(),
      }),
    )
  })
})
