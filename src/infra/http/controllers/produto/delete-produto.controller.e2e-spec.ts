import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { ProdutoFactory } from '@test/factories/make-produto'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Delete produto (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let produtoFactory: ProdutoFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, ProdutoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    produtoFactory = moduleRef.get(ProdutoFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /product/:id', async () => {
    const produto = await produtoFactory.makePrismaProduto()
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/product/${produto.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const produtoOnDatabase = await prisma.produto.findUnique({
      where: {
        id: produto.id.toString(),
      },
    })

    expect(produtoOnDatabase).toBeNull()
  })
})
