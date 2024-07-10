import { User } from '../entities/user'

export abstract class UserRepository {
  abstract create(data: User): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(data: User): Promise<void>
  abstract delete(data: User): Promise<void>
}
