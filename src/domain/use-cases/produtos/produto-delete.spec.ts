import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { DeleteProdutoUseCase } from './produto-delete-use-case'
import { InMemoryProdutoRepository } from '@test/repositories/in-memory-produto-repository'
import { makeProduto } from '@test/factories/make-produto'

let inMemoryProdutoRepository: InMemoryProdutoRepository
let sut: DeleteProdutoUseCase

describe('Delete produto', () => {
  beforeEach(() => {
    inMemoryProdutoRepository = new InMemoryProdutoRepository()
    sut = new DeleteProdutoUseCase(inMemoryProdutoRepository)
  })

  it('should be able to delete a prodtuo', async () => {
    const newProduto = makeProduto({}, new UniqueEntityId('produto-1'))

    await inMemoryProdutoRepository.create(newProduto)

    await sut.execute({
      id: 'produto-1',
    })

    expect(inMemoryProdutoRepository.items).toHaveLength(0)
  })
})
