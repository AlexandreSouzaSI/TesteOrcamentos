import { UseCaseError } from '@src/core/errors/use-case-error'

export class ProdutoAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Produto ${identifier} already exists`)
  }
}
