import { Renda } from 'src/domain/entities/renda'

export class RendaPresenter {
  static toHTTP(renda: Renda) {
    return {
      id: renda.id.toString(),
      name: renda.name,
      data: renda.data,
      valor: renda.valor,
      createdAt: renda.createdAt,
      updatedAt: renda.updatedAt,
      userId: renda.userId.toString(),
    }
  }
}
