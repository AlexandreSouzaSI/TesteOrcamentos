import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { InMemoryCategoriaRepository } from '@test/repositories/in-memory-categoria-repository'
import { EditCategoriaUseCase } from './categoria-edit-use-case'
import { makeCategoria } from '@test/factories/make-categoria'

let inMemoryCategoriaRepository: InMemoryCategoriaRepository
let sut: EditCategoriaUseCase

describe('Edit categoria', () => {
  beforeEach(() => {
    inMemoryCategoriaRepository = new InMemoryCategoriaRepository()
    sut = new EditCategoriaUseCase(inMemoryCategoriaRepository)
  })

  it('should be able to edit a categoria', async () => {
    const newCategoria = makeCategoria({}, new UniqueEntityId('categoria-1'))

    await inMemoryCategoriaRepository.create(newCategoria)

    const result = await sut.execute({
      id: 'categoria-1',
      name: 'Nome Teste',
    })

    const updatedCategoria = inMemoryCategoriaRepository.items[0]

    expect(updatedCategoria).toMatchObject({
      name: 'Nome Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      categoria: updatedCategoria,
    })
  })

  it('should return ResourceNotFoundError if categoria does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-user',
      name: 'Nome Teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
