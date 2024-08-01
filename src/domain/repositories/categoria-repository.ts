import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Categoria } from '../entities/categoria'

export abstract class CategoriaRepository {
  abstract create(data: Categoria): Promise<void>
  abstract findMany(
    params: PaginationParams,
    id?: string,
    name?: string,
  ): Promise<Categoria[]>

  abstract findById(categoriaId: string): Promise<Categoria | null>
  abstract findByName(name: string): Promise<Categoria | null>
  abstract save(data: Categoria): Promise<void>
  abstract delete(data: Categoria): Promise<void>
}
