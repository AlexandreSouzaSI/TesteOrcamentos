import { CountRendaUseCase } from './renda-count-use-case'
import { InMemoryRendaRepository } from 'test/repositories/in-memory-renda-repository'
import { makeRenda } from 'test/factories/make-renda'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: CountRendaUseCase

describe('Count Renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new CountRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to count the number of rendas', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRendaRepository.create(
        makeRenda({
          userId: new UniqueEntityId('renda-1'),
          createdAt: new Date(),
        }),
      )
    }

    const result = await sut.execute({
      userId: 'renda-1',
    })

    console.log(result)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ renda: 22 })
  })
})
