import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryDespesasRepository } from 'test/repositories/in-memory-despesas-repository'
import { FetchRecentDespesasUseCase } from './despesas-fetch-recent-use-case'
import { makeDespesa } from 'test/factories/make-despesa'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: FetchRecentDespesasUseCase

describe('Fetch a recent despesas', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new FetchRecentDespesasUseCase(inMemoryDespesasRepository)
  })

  it('should be able to fetch recent odespesas', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('user-1'),
          createdAt: new Date(),
        }),
      )
    }

    const result = await sut.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(result.value?.despesas).toHaveLength(2)
  })
})
