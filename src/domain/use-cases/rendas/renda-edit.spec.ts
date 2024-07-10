import { InMemoryRendaRepository } from 'test/repositories/in-memory-renda-repository'
import { EditRendaUseCase } from './renda-edit-use-case'
import { makeRenda } from 'test/factories/make-renda'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: EditRendaUseCase

describe('Edit renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new EditRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to edit a renda', async () => {
    const newRenda = makeRenda({}, new UniqueEntityId('renda-1'))

    await inMemoryRendaRepository.create(newRenda)

    await sut.execute({
      rendaId: 'renda-1',
      name: 'salario',
      valor: 2500,
    })

    expect(inMemoryRendaRepository.items[0]).toMatchObject({
      name: 'salario',
      valor: 2500,
    })
  })
})
