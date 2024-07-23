import { InMemoryProdutoRepository } from '@test/repositories/in-memory-produto-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { GetByNameProdutoUseCase } from './produto-get-by-name-use-case'
import { makeProduto } from '@test/factories/make-produto'

let inMemoryProdutoRepository: InMemoryProdutoRepository
let sut: GetByNameProdutoUseCase

describe('Get by name produto', () => {
  beforeEach(() => {
    inMemoryProdutoRepository = new InMemoryProdutoRepository()
    sut = new GetByNameProdutoUseCase(inMemoryProdutoRepository)
  })

  it('should be able to get by name produto', async () => {
    await inMemoryProdutoRepository.create(
      makeProduto(
        {
          name: 'produto',
        },
        new UniqueEntityId('produto-1'),
      ),
    )

    const produto = await sut.execute({
      name: 'produto',
    })

    expect(produto.isRight()).toBe(true)
  })
})
