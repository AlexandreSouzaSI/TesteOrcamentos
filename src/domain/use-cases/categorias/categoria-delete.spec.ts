import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryCategoriaRepository } from '@test/repositories/in-memory-categoria-repository'
import { DeleteCategoriaUseCase } from './categoria-delete-use-case'
import { makeCategoria } from '@test/factories/make-categoria'

let inMemoryCategoriaRepository: InMemoryCategoriaRepository
let sut: DeleteCategoriaUseCase

describe('Delete categoria', () => {
  beforeEach(() => {
    inMemoryCategoriaRepository = new InMemoryCategoriaRepository()
    sut = new DeleteCategoriaUseCase(inMemoryCategoriaRepository)
  })

  it('should be able to delete a categoria', async () => {
    const newCategoria = makeCategoria({}, new UniqueEntityId('categoria-1'))

    await inMemoryCategoriaRepository.create(newCategoria)

    await sut.execute({
      id: 'categoria-1',
    })

    expect(inMemoryCategoriaRepository.items).toHaveLength(0)
  })
})
