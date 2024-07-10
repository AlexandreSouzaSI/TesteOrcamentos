import { Despesas } from 'src/domain/entities/despesas'

export class DespesasPresenter {
  static toHTTP(despesa: Despesas) {
    return {
      id: despesa.id.toString(),
      name: despesa.name,
      data: despesa.data,
      valor: despesa.valor,
      dataVencimento: despesa.dataVencimento,
      createdAt: despesa.createdAt,
      updatedAt: despesa.updatedAt,
      userId: despesa.userId.toString(),
    }
  }
}
