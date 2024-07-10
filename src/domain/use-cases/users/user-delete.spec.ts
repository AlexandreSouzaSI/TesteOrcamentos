import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { DeleteUserUseCase } from './user-delete-use-case'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be able to delete a user', async () => {
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryUserRepository.create(newUser)

    await sut.execute({
      userId: 'user-1',
    })

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})
