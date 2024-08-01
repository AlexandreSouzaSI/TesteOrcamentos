import { Produto } from '@src/domain/entities/produto'

export class ProdutoPresenter {
  static toHTTP(produto: Produto) {
    return {
      id: produto.id.toString(),
      name: produto.name,
      quantidadeMinima: produto.quantidadeMinima,
      quantidadeEstoque: produto.quantidadeEstoque,
      categoriaId: produto.categoriaId,
      categoria: produto.categoria,
    }
  }

  static formatResponse(produtos: Produto | Produto[]) {
    if (Array.isArray(produtos)) {
      return produtos.map((produto) => this.toHTTP(produto))
    } else {
      return this.toHTTP(produtos)
    }
  }
}
