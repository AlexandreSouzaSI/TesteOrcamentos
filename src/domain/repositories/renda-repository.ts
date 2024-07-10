import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Renda } from '../entities/renda'

export abstract class RendaRepository {
  abstract create(data: Renda): Promise<void>
  abstract findById(id: string): Promise<Renda | null>
  abstract findManyRecent(
    params: PaginationParams,
    id: string,
  ): Promise<Renda[]>

  abstract save(data: Renda): Promise<void>
  abstract delete(data: Renda): Promise<void>
}
