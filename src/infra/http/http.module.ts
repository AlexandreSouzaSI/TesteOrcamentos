import { CountRendaUseCase } from './../../domain/use-cases/rendas/renda-count-use-case'
import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/users/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CreateUserUseCase } from 'src/domain/use-cases/users/user-create-use-case'
import { PrismaClient } from '@prisma/client'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateUserUseCase } from 'src/domain/use-cases/users/user-authenticate-use-case'
import { CreateDespesasController } from './controllers/despesas/create-despesas.controller'
import { CreateDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-create-use-case'
import { FetchRecentDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-fetch-recent-use-case'
import { FetchUserUseCase } from 'src/domain/use-cases/users/user-fetch-use-case'
import { FetchAccountController } from './controllers/users/fetch-account.controller'
import { EditAccountController } from './controllers/users/edit-account.controller'
import { EditUserUseCase } from 'src/domain/use-cases/users/user-edit-use-case'
import { DeleteUserUseCase } from 'src/domain/use-cases/users/user-delete-use-case'
import { DeleteAccountController } from './controllers/users/delete-account.controller'
import { DeleteDespesasController } from './controllers/despesas/delete-despesa.controller'
import { FetchDespesasController } from './controllers/despesas/fetch-despesas-by-id.controller'
import { FetchRecentDespesasController } from './controllers/despesas/fetch-recent-despesas.controller'
import { FetchDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-fetch-use-case'
import { DeleteDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-delete-use-case'
import { EditDespesasController } from './controllers/despesas/edit-despesa.controller'
import { EditDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-edit-use-case'
import { CreateRendaController } from './controllers/rendas/create-renda.controller'
import { EditRendaController } from './controllers/rendas/edit-renda.controller'
import { DeleteRendaController } from './controllers/rendas/delete-renda.controller'
import { FetchRendaController } from './controllers/rendas/fetch-renda.controller'
import { FetchRecentRendaController } from './controllers/rendas/fetch-recent-renda.controller'
import { CreateRendaUseCase } from 'src/domain/use-cases/rendas/renda-create-use-case'
import { EditRendaUseCase } from 'src/domain/use-cases/rendas/renda-edit-use-case'
import { DeleteRendaUseCase } from 'src/domain/use-cases/rendas/renda-delete-use-case'
import { FetchRendaUseCase } from 'src/domain/use-cases/rendas/renda-fetch-use-case'
import { FetchRecentRendaUseCase } from 'src/domain/use-cases/rendas/renda-fetch-recent-use-case'
import { AuthController } from './controllers/logout.controller'
import { CountDespesaUseCase } from 'src/domain/use-cases/despesas/despesa-count-use-case'
import { SumRendaUseCase } from 'src/domain/use-cases/rendas/renda-sum-values-use-case'
import { SumDespesaUseCase } from 'src/domain/use-cases/despesas/despesa-sum-values-use-case'
import { DifferenceUseCase } from 'src/domain/use-cases/users/user-difference-use-case'
import { DifferenceController } from './controllers/users/difference.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    FetchAccountController,
    EditAccountController,
    DeleteAccountController,
    CreateDespesasController,
    FetchDespesasController,
    DeleteDespesasController,
    EditDespesasController,
    FetchRecentDespesasController,
    CreateRendaController,
    EditRendaController,
    DeleteRendaController,
    FetchRendaController,
    FetchRecentRendaController,
    AuthController,
    DifferenceController,
  ],
  providers: [
    PrismaClient,
    CreateUserUseCase,
    FetchUserUseCase,
    AuthenticateUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
    CreateDespesasUseCase,
    FetchDespesasUseCase,
    DeleteDespesasUseCase,
    EditDespesasUseCase,
    FetchRecentDespesasUseCase,
    CreateRendaUseCase,
    EditRendaUseCase,
    DeleteRendaUseCase,
    FetchRendaUseCase,
    FetchRecentRendaUseCase,
    CountRendaUseCase,
    CountDespesaUseCase,
    SumRendaUseCase,
    SumDespesaUseCase,
    DifferenceUseCase,
  ],
})
export class HttpModule {}
