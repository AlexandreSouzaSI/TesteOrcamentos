import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CountDespesaUseCase } from './despesa-count-use-case'
import { makeDespesa } from 'test/factories/make-despesa'
import { InMemoryDespesasRepository } from '@test/repositories/in-memory-despesas-repository'

let inMemoryDespesaRepository: InMemoryDespesasRepository
let sut: CountDespesaUseCase

describe('Count Despesa', () => {
  beforeEach(() => {
    inMemoryDespesaRepository = new InMemoryDespesasRepository()
    sut = new CountDespesaUseCase(inMemoryDespesaRepository)
  })

  it('should be able to count the number of rendas', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryDespesaRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-1'),
          createdAt: new Date(),
        }),
      )
    }

    const result = await sut.execute({
      userId: 'despesa-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ despesa: 22 })
  })
})
