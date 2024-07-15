import * as bcrypt from 'bcryptjs'

export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>
}

export class BcryptHashGenerator extends HashGenerator {
  private HASH_SALT_LENGTH = 8

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.HASH_SALT_LENGTH)
  }
}
