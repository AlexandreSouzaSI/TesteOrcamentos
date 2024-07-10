import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './user-create-use-case'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let sut: CreateUserUseCase

describe('create a User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateUserUseCase(inMemoryUserRepository, fakeHasher)
  })

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      name: 'Alexandre',
      email: 'alemoura33@teste.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    await sut.execute({
      name: 'Alexandre',
      email: 'alemoura33@teste.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })
})
