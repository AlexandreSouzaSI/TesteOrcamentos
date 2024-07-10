import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryDespesasRepository } from 'test/repositories/in-memory-despesas-repository'
import { DeleteDespesasUseCase } from './despesas-delete-use-case'
import { makeDespesa } from 'test/factories/make-despesa'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: DeleteDespesasUseCase

describe('Delete despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new DeleteDespesasUseCase(inMemoryDespesasRepository)
  })

  it('should be able to delete a despesa', async () => {
    const newDespesa = makeDespesa({}, new UniqueEntityId('despesa-1'))

    await inMemoryDespesasRepository.create(newDespesa)

    await sut.execute({
      despesaId: 'despesa-1',
    })

    expect(inMemoryDespesasRepository.items).toHaveLength(0)
  })
})
