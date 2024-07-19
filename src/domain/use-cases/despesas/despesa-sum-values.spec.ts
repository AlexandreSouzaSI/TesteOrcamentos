import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { SumDespesaUseCase } from './despesa-sum-values-use-case'
import { makeDespesa } from 'test/factories/make-despesa'
import { InMemoryDespesasRepository } from '@test/repositories/in-memory-despesas-repository'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: SumDespesaUseCase

describe('Fetch a value total despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new SumDespesaUseCase(inMemoryDespesasRepository)
  })

  it('should be able to fetch total despesa value without status', async () => {
    for (let i = 1; i <= 10; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-1'),
          createdAt: new Date(),
          valor: 100,
        }),
      )
    }

    const result = await sut.execute({
      userId: 'despesa-1',
    })

    expect(result.value?.despesa).toEqual(1000)
  })

  it('should be able to fetch total despesa value with specific status', async () => {
    for (let i = 1; i <= 5; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-2'),
          createdAt: new Date(),
          valor: 100,
          status: 'pendente',
        }),
      )
    }

    for (let i = 1; i <= 5; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-2'),
          createdAt: new Date(),
          valor: 200,
          status: 'pago',
        }),
      )
    }

    const result = await sut.execute({
      userId: 'despesa-2',
      status: 'pendente',
    })

    expect(result.value?.despesa).toEqual(500)
  })

  it('should be able to fetch total despesa value without passing status', async () => {
    for (let i = 1; i <= 5; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-3'),
          createdAt: new Date(),
          valor: 100,
          status: 'pendente',
        }),
      )
    }

    for (let i = 1; i <= 5; i++) {
      await inMemoryDespesasRepository.create(
        makeDespesa({
          userId: new UniqueEntityId('despesa-3'),
          createdAt: new Date(),
          valor: 200,
          status: 'pago',
        }),
      )
    }

    const result = await sut.execute({
      userId: 'despesa-3',
    })

    expect(result.value?.despesa).toEqual(1500)
  })
})
