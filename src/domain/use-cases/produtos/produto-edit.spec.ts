import { InMemoryProdutoRepository } from '@test/repositories/in-memory-produto-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { EditProdutoUseCase } from './produto-edit-use-case'
import { makeProduto } from '@test/factories/make-produto'

let inMemoryProdutoRepository: InMemoryProdutoRepository
let sut: EditProdutoUseCase

describe('Edit produto', () => {
  beforeEach(() => {
    inMemoryProdutoRepository = new InMemoryProdutoRepository()
    sut = new EditProdutoUseCase(inMemoryProdutoRepository)
  })

  it('should be able to edit a produto', async () => {
    const newProduto = makeProduto({}, new UniqueEntityId('produto-1'))

    await inMemoryProdutoRepository.create(newProduto)

    const result = await sut.execute({
      id: 'produto-1',
      name: 'Nome Teste',
    })

    const updatedProduto = inMemoryProdutoRepository.items[0]

    expect(updatedProduto).toMatchObject({
      name: 'Nome Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      produto: updatedProduto,
    })
  })

  it('should return ResourceNotFoundError if produto does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-user',
      name: 'Nome Teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
