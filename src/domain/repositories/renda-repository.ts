import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Renda } from '../entities/renda'

export abstract class RendaRepository {
  abstract create(data: Renda): Promise<void>
  abstract findById(id: string): Promise<Renda | null>
  abstract findCount(id: string): Promise<number | null>
  abstract findManyRecent(
    params: PaginationParams,
    id: string,
    name?: string,
    status?: string,
    categoriaId?: string,
  ): Promise<Renda[]>

  abstract sumRendaValues(id: string): Promise<number | null>
  abstract save(data: Renda): Promise<void>
  abstract delete(data: Renda): Promise<void>
}
