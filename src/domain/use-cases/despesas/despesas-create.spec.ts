import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CreateDespesasUseCase } from './despesas-create-use-case'
import { InMemoryDespesasRepository } from 'test/repositories/in-memory-despesas-repository'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: CreateDespesasUseCase

describe('create a despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new CreateDespesasUseCase(inMemoryDespesasRepository)
  })

  it('should be able to create a despesa', async () => {
    const despesa = await sut.execute({
      userId: new UniqueEntityId('21'),
      name: 'conta de luz',
      valor: 100,
      data: new Date(),
      dataVencimento: new Date(),
    })

    expect(despesa.value?.despesa.valor).toEqual(100)
  })
})
