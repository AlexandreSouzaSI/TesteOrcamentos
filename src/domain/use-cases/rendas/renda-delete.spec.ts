import { InMemoryRendaRepository } from 'test/repositories/in-memory-renda-repository'
import { DeleteRendaUseCase } from './renda-delete-use-case'
import { makeRenda } from 'test/factories/make-renda'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: DeleteRendaUseCase

describe('Delete renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new DeleteRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to delete a renda', async () => {
    const newStock = makeRenda({}, new UniqueEntityId('renda-1'))

    await inMemoryRendaRepository.create(newStock)

    await sut.execute({
      rendaId: 'renda-1',
    })

    expect(inMemoryRendaRepository.items).toHaveLength(0)
  })
})
