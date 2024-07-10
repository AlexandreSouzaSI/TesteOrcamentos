import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'
import { DespesaFactory } from 'test/factories/make-despesa'
import { UserFactory } from 'test/factories/make-user'

describe('Delete despesa (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let despesaFactory: DespesaFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, DespesaFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    despesaFactory = moduleRef.get(DespesaFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /despesa/:despesaId', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const despesa = await despesaFactory.makePrismaDespesa({
      userId: user.id,
    })

    const despesaId = despesa.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/despesa/${despesaId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const despesaOnDatabase = await prisma.despesas.findUnique({
      where: {
        id: despesaId,
      },
    })

    expect(despesaOnDatabase).toBeNull()
  })
})
