import { UseCaseError } from 'src/core/errors/use-case-error'

export class RendaAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Renda ${identifier} already exists`)
  }
}
