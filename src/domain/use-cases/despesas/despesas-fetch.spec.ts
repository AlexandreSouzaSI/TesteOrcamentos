import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryDespesasRepository } from 'test/repositories/in-memory-despesas-repository'
import { FetchDespesasUseCase } from './despesas-fetch-use-case'
import { makeDespesa } from 'test/factories/make-despesa'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: FetchDespesasUseCase

describe('Fetch a despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new FetchDespesasUseCase(inMemoryDespesasRepository)
  })

  it('should be able to fetch a despesa', async () => {
    await inMemoryDespesasRepository.create(
      makeDespesa({}, new UniqueEntityId('despesa-1')),
    )

    const despesa = await sut.execute({
      despesaId: 'despesa-1',
    })

    expect(inMemoryDespesasRepository.items[0].id).toEqual(
      despesa.value?.despesas?.id,
    )
  })
})
