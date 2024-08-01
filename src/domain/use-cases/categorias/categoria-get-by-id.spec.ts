import { InMemoryCategoriaRepository } from '@test/repositories/in-memory-categoria-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeCategoria } from '@test/factories/make-categoria'
import { GetByIdCategoriaUseCase } from './categoria-get-by-id-use-case'

let inMemoryCategoriaRepository: InMemoryCategoriaRepository
let sut: GetByIdCategoriaUseCase

describe('Get by id categoria', () => {
  beforeEach(() => {
    inMemoryCategoriaRepository = new InMemoryCategoriaRepository()
    sut = new GetByIdCategoriaUseCase(inMemoryCategoriaRepository)
  })

  it('should be able to get by id categoria', async () => {
    await inMemoryCategoriaRepository.create(
      makeCategoria(
        {
          name: 'categoria',
        },
        new UniqueEntityId('categoria-1'),
      ),
    )

    const categoria = await sut.execute({
      categoriaId: 'categoria-1',
    })

    expect(categoria.isRight()).toBe(true)
  })
})
