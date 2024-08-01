import { Renda } from 'src/domain/entities/renda'

export class RendaPresenter {
  static toHTTP(renda: Renda) {
    return {
      id: renda.id.toString(),
      name: renda.name,
      data: renda.data,
      valor: renda.valor,
      status: renda.status,
      createdAt: renda.createdAt,
      updatedAt: renda.updatedAt,
      userId: renda.userId.toString(),
      categoriaId: renda.categoriaId,
      categoria: renda.categoria,
    }
  }

  static formatResponse(
    renda: Renda[],
    meta: { pageIndex: number; perPage: number; totalCount: number | null },
  ) {
    return {
      renda: renda.map(RendaPresenter.toHTTP),
      meta: {
        pageIndex: meta.pageIndex,
        perPage: meta.perPage,
        totalCount: meta.totalCount,
      },
    }
  }
}
