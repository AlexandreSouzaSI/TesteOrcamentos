import { UseCaseError } from '@src/core/errors/use-case-error'

export class CategoriaAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Categoria ${identifier} already exists`)
  }
}
