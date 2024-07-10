import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AuthenticateUserUseCase } from './user-authenticate-use-case'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a new user', async () => {
    const newUser = makeUser({
      email: 'alemoura33@teste.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.items.push(newUser)

    const result = await sut.execute({
      email: 'alemoura33@teste.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
