import { Categoria } from '@src/domain/entities/categoria'

export class CategoriaPresenter {
  static toHTTP(categoria: Categoria) {
    return {
      id: categoria.id.toString(),
      name: categoria.name,
    }
  }

  static formatResponse(categorias: Categoria[]) {
    return categorias.map(CategoriaPresenter.toHTTP)
  }
}
