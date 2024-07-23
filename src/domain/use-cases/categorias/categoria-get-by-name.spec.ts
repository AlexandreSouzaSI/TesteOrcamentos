import { InMemoryCategoriaRepository } from '@test/repositories/in-memory-categoria-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeCategoria } from '@test/factories/make-categoria'
import { GetByNameCategoriaUseCase } from './categoria-get-by-name-use-case'

let inMemoryCategoriaRepository: InMemoryCategoriaRepository
let sut: GetByNameCategoriaUseCase

describe('Get by name categoria', () => {
  beforeEach(() => {
    inMemoryCategoriaRepository = new InMemoryCategoriaRepository()
    sut = new GetByNameCategoriaUseCase(inMemoryCategoriaRepository)
  })

  it('should be able to get by name categoria', async () => {
    await inMemoryCategoriaRepository.create(
      makeCategoria(
        {
          name: 'categoria',
        },
        new UniqueEntityId('categoria-1'),
      ),
    )

    const categoria = await sut.execute({
      name: 'categoria',
    })

    expect(categoria.isRight()).toBe(true)
  })
})
