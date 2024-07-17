import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { SumDespesaUseCase } from './despesa-sum-values-use-case'
import { makeDespesa } from 'test/factories/make-despesa'
import { InMemoryDespesasRepository } from '@test/repositories/in-memory-despesas-repository'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: SumDespesaUseCase

describe('Fetch a value total despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new SumDespesaUseCase(inMemoryDespesasRepository)
  })

  it('should be able to fetch value total despesa', async () => {
    for (let i = 1; i <= 10; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-1'),
          createdAt: new Date(),
          valor: 100,
        }),
      )
    }

    const result = await sut.execute({
      userId: 'despesa-1',
    })

    expect(result.value?.despesa).toEqual(1000)
  })
})
