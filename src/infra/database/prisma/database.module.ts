import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaUserRepository } from './repositories/prisma-user-repository'
import { PrismaRendaRepository } from './repositories/prisma-renda-repository'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { RendaRepository } from 'src/domain/repositories/renda-repository'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'
import { PrismaDespesasRepository } from './repositories/prisma-despesas-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: DespesasRepository,
      useClass: PrismaDespesasRepository,
    },
    {
      provide: RendaRepository,
      useClass: PrismaRendaRepository,
    },
  ],
  exports: [PrismaService, UserRepository, DespesasRepository, RendaRepository],
})
export class DatabaseModule {}
