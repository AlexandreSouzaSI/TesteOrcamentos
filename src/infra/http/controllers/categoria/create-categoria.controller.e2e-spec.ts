import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../../../app.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@src/infra/database/prisma/database.module'

describe('Create Categoria (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /category', async () => {
    const response = await request(app.getHttpServer()).post('/category').send({
      name: 'Bebidas',
    })

    expect(response.statusCode).toBe(201)

    const categoriaOnDatabase = await prisma.categoria.findFirst({
      where: {
        name: 'Bebidas',
      },
    })

    expect(categoriaOnDatabase).toBeTruthy()
  })
})
