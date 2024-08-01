import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { Either } from 'src/core/either'

interface FetchRecentCategoriaUseCaseRequest {
  pageIndex: number
  name?: string
}

type FetchCategoriaUseCaseResponse = Either<
  null,
  {
    categoria: {
      id: UniqueEntityId
      name: string
    }[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number | null
    }
  }
>

@Injectable()
export class FetchCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    pageIndex,
    name,
  }: FetchRecentCategoriaUseCaseRequest): Promise<FetchCategoriaUseCaseResponse> {
    const categoria = await this.categoriaRepository.findMany(
      { pageIndex },
      name,
    )

    const totalCount = categoria.length

    return right({ categoria, meta: { pageIndex, perPage: 10, totalCount } })
  }
}
