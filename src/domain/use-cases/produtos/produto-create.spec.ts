import { InMemoryProdutoRepository } from '@test/repositories/in-memory-produto-repository'
import { CreateProdutoUseCase } from './produto-create-use-case'

let inMemoryProdutoRepository: InMemoryProdutoRepository
let sut: CreateProdutoUseCase

describe('create a Produto', () => {
  beforeEach(() => {
    inMemoryProdutoRepository = new InMemoryProdutoRepository()
    sut = new CreateProdutoUseCase(inMemoryProdutoRepository)
  })

  it('should be able to create a Produto', async () => {
    const result = await sut.execute({
      name: 'Alexandre',
      quantidadeEstoque: 10,
      quantidadeMinima: 5,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      produto: inMemoryProdutoRepository.items[0],
    })
  })
})
