import { InMemoryRendaRepository } from 'test/repositories/in-memory-renda-repository'
import { FetchRendaUseCase } from './renda-fetch-use-case'
import { makeRenda } from 'test/factories/make-renda'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: FetchRendaUseCase

describe('Fetch a renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new FetchRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to fetch a renda', async () => {
    await inMemoryRendaRepository.create(
      makeRenda({}, new UniqueEntityId('renda-1')),
    )

    const renda = await sut.execute({
      rendaId: 'renda-1',
    })

    expect(renda.isRight()).toBe(true)
  })
})
