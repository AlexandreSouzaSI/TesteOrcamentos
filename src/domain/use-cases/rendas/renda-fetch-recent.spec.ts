import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryRendaRepository } from 'test/repositories/in-memory-renda-repository'
import { makeRenda } from 'test/factories/make-renda'
import { FetchRecentRendaUseCase } from './renda-fetch-recent-use-case'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: FetchRecentRendaUseCase

describe('Fetch a recent renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new FetchRecentRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to fetch recent renda', async () => {
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
      page: 2,
    })

    expect(result.value?.renda).toHaveLength(2)
  })
})
