import { InMemoryCategoriaRepository } from '@test/repositories/in-memory-categoria-repository'
import { CreateCategoriaUseCase } from './categoria-create-use-case'

let inMemoryCategoriaRepository: InMemoryCategoriaRepository
let sut: CreateCategoriaUseCase

describe('create a Categoria', () => {
  beforeEach(() => {
    inMemoryCategoriaRepository = new InMemoryCategoriaRepository()
    sut = new CreateCategoriaUseCase(inMemoryCategoriaRepository)
  })

  it('should be able to create a categoria', async () => {
    const result = await sut.execute({
      name: 'Alexandre',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      categoria: inMemoryCategoriaRepository.items[0],
    })
  })
})
