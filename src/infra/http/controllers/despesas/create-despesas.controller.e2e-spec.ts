import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'

describe('Create despesa (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  test('[POST] /despesa', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/despesa')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Conta de Luz',
        valor: 120.0,
        status: 'vencido',
        dataVencimento: '2024-07-17',
      })

    expect(response.statusCode).toBe(201)

    const despesaOnDatabase = await prisma.despesas.findFirst({
      where: {
        name: 'Conta de Luz',
      },
    })
    expect(despesaOnDatabase).toBeTruthy()
    expect(despesaOnDatabase?.dataVencimento).toEqual('2024-07-17')
  })
})
