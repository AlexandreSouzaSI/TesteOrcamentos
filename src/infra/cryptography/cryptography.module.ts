import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { Encrypter } from 'src/domain/cryptography/encrypter'
import { HashComparer } from 'src/domain/cryptography/hash-comparer'
import { BcryptHasher } from './bcrypt-hasher'
import { HashGenerator } from 'src/domain/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
