import { InMemoryProdutoRepository } from '@test/repositories/in-memory-produto-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { FetchProdutoUseCase } from './produto-fetch-use-case'
import { makeProduto } from '@test/factories/make-produto'

let inMemoryProdutoRepository: InMemoryProdutoRepository
let sut: FetchProdutoUseCase

describe('Get by id produto', () => {
  beforeEach(() => {
    inMemoryProdutoRepository = new InMemoryProdutoRepository()
    sut = new FetchProdutoUseCase(inMemoryProdutoRepository)
  })

  it('should be able to get by id a produto', async () => {
    await inMemoryProdutoRepository.create(
      makeProduto({}, new UniqueEntityId('produto-1')),
    )

    const produto = await sut.execute({
      produtoId: 'produto-1',
    })

    expect(produto.isRight()).toBe(true)
  })
})
