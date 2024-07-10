import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { EditUserUseCase } from './user-edit-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: EditUserUseCase

describe('Edit uer', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new EditUserUseCase(inMemoryUserRepository)
  })

  it('should be able to edit a user', async () => {
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryUserRepository.create(newUser)

    await sut.execute({
      userId: 'user-1',
      name: 'Nome Teste',
      password: '10923387',
    })

    expect(inMemoryUserRepository.items[0]).toMatchObject({
      name: 'Nome Teste',
    })
  })
})
