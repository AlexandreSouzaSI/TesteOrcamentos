import { InMemoryRendaRepository } from '@test/repositories/in-memory-renda-repository'
import { CreateRendaUseCase } from './renda-create-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryRendaRepository: InMemoryRendaRepository
let sut: CreateRendaUseCase

describe('create a renda', () => {
  beforeEach(() => {
    inMemoryRendaRepository = new InMemoryRendaRepository()
    sut = new CreateRendaUseCase(inMemoryRendaRepository)
  })

  it('should be able to create a renda', async () => {
    const renda = await sut.execute({
      userId: new UniqueEntityId('21'),
      name: 'Salario',
      valor: 2000,
      data: '',
      status: 'pendente',
    })

    expect(renda.value?.renda.valor).toEqual(2000)
  })
})
