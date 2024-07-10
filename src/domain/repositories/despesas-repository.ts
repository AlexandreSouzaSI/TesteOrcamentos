import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Despesas } from '../entities/despesas'

export abstract class DespesasRepository {
  abstract create(data: Despesas): Promise<void>
  abstract findById(id: string): Promise<Despesas | null>
  abstract findManyRecent(
    params: PaginationParams,
    id: string,
  ): Promise<Despesas[]>

  abstract save(data: Despesas): Promise<void>
  abstract delete(data: Despesas): Promise<void>
}
