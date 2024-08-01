import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Produto } from '../entities/produto'

export abstract class ProdutoRepository {
  abstract create(data: Produto): Promise<void>
  abstract findById(produtoId: string): Promise<Produto | null>
  abstract findByName(name: string): Promise<Produto | null>
  abstract findMany(
    params: PaginationParams,
    id: string,
    name?: string,
    categoriaId?: string,
  ): Promise<Produto[]>

  abstract save(data: Produto): Promise<void>
  abstract delete(data: Produto): Promise<void>
}
