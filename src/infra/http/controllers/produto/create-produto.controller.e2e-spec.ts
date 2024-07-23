import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../../../app.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

describe('Create Produto (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /product', async () => {
    const response = await request(app.getHttpServer()).post('/product').send({
      name: 'Spaten',
      quantidadeMinima: 5,
      quantidadeEstoque: 12,
    })

    expect(response.statusCode).toBe(201)

    const produtoOnDatabase = await prisma.produto.findFirst({
      where: {
        name: 'Spaten',
      },
    })

    expect(produtoOnDatabase).toBeTruthy()
  })
})
