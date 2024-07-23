import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Despesas } from '../entities/despesas'

export abstract class DespesasRepository {
  abstract create(data: Despesas): Promise<void>
  abstract findById(id: string): Promise<Despesas | null>
  abstract findCount(id: string): Promise<number | null>
  abstract findManyRecent(
    params: PaginationParams,
    id: string,
    name?: string,
    status?: string,
    categoriaId?: string,
  ): Promise<Despesas[]>

  abstract sumDespesaValues(id: string, status?: string): Promise<number | null>
  abstract save(data: Despesas): Promise<void>
  abstract delete(data: Despesas): Promise<void>
}
