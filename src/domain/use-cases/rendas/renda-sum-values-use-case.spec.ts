import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryRendaRepository } from '@test/repositories/in-memory-renda-repository'
import { makeRenda } from 'test/factories/make-renda'
import { SumRendaUseCase } from './renda-sum-values-use-case'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: SumRendaUseCase

describe('Fetch a recent renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new SumRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to fetch recent renda', async () => {
    for (let i = 1; i <= 10; i++) {
      await inMemoryRendaRepository.create(
        makeRenda({
          userId: new UniqueEntityId('renda-1'),
          createdAt: new Date(),
          valor: 100,
        }),
      )
    }

    const result = await sut.execute({
      userId: 'renda-1',
    })

    expect(result.value?.renda).toEqual(1000)
  })
})
