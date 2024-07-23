import { Categoria } from '../entities/categoria'

export abstract class CategoriaRepository {
  abstract create(data: Categoria): Promise<void>
  abstract findById(categoriaId: string): Promise<Categoria | null>
  abstract findByName(name: string): Promise<Categoria | null>
  abstract save(data: Categoria): Promise<void>
  abstract delete(data: Categoria): Promise<void>
}
