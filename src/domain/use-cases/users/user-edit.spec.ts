import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { EditUserUseCase } from './user-edit-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { BcryptHashGenerator } from 'src/domain/cryptography/hash-generator'

let inMemoryUserRepository: InMemoryUserRepository
let sut: EditUserUseCase
let hashGenerator: BcryptHashGenerator

describe('Edit user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    hashGenerator = new BcryptHashGenerator()
    sut = new EditUserUseCase(inMemoryUserRepository, hashGenerator)
  })

  it('should be able to edit a user', async () => {
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryUserRepository.create(newUser)

    const result = await sut.execute({
      id: 'user-1',
      name: 'Nome Teste',
      password: '10923387',
    })

    const updatedUser = inMemoryUserRepository.items[0]

    expect(updatedUser).toMatchObject({
      name: 'Nome Teste',
    })

    await hashGenerator.hash('10923387')

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: updatedUser,
    })
  })

  it('should return ResourceNotFoundError if user does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-user',
      name: 'Nome Teste',
      password: '10923387',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
