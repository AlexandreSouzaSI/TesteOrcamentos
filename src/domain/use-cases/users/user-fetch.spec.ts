import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { FetchUserUseCase } from './user-fetch-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FetchUserUseCase

describe('Fetch a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchUserUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch a user', async () => {
    await inMemoryUserRepository.create(
      makeUser({}, new UniqueEntityId('user-1')),
    )

    const user = await sut.execute({
      userId: 'user-1',
    })

    expect(user.isRight()).toBe(true)
  })
})
