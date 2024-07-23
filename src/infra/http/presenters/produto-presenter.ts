import { Produto } from '@src/domain/entities/produto'

export class ProdutoPresenter {
  static toHTTP(produto: Produto) {
    return {
      id: produto.id.toString(),
      name: produto.name,
      quantidadeMinima: produto.quantidadeMinima,
      quantidadeEstoque: produto.quantidadeEstoque,
      categoriaId: produto.categoriaId,
    }
  }
}
