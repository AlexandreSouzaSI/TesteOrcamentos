import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDespesasRepository } from 'test/repositories/in-memory-despesas-repository'
import { EditDespesasUseCase } from './despesas-edit-use-case'
import { makeDespesa } from 'test/factories/make-despesa'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let sut: EditDespesasUseCase

describe('Edit despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    sut = new EditDespesasUseCase(inMemoryDespesasRepository)
  })

  it('should be able to edit a despesa', async () => {
    const newSale = makeDespesa({}, new UniqueEntityId('despesa-1'))
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryDespesasRepository.create(newSale)

    await sut.execute({
      despesaId: 'despesa-1',
      name: 'Conta de Agua Atualizada',
      valor: 150,
      userId: newUser.id,
    })

    expect(inMemoryDespesasRepository.items[0]).toMatchObject({
      name: 'Conta de Agua Atualizada',
      valor: 150,
    })
  })
})
