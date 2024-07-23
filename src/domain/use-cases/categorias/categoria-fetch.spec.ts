import { InMemoryCategoriaRepository } from '@test/repositories/in-memory-categoria-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { FetchCategoriaUseCase } from './categoria-fetch-use-case'
import { makeCategoria } from '@test/factories/make-categoria'

let inMemoryCategoriaRepository: InMemoryCategoriaRepository
let sut: FetchCategoriaUseCase

describe('Fetch a categoria', () => {
  beforeEach(() => {
    inMemoryCategoriaRepository = new InMemoryCategoriaRepository()
    sut = new FetchCategoriaUseCase(inMemoryCategoriaRepository)
  })

  it('should be able to fetch a categoria', async () => {
    await inMemoryCategoriaRepository.create(
      makeCategoria({}, new UniqueEntityId('categoria-1')),
    )

    const categoria = await sut.execute({
      categoriaId: 'categoria-1',
    })

    expect(categoria.isRight()).toBe(true)
  })
})
