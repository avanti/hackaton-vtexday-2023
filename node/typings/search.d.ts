export interface Pagination {
  page: number
  pageSize: number
}

export interface PaginationWithTotal extends Pagination {
  total: number
}

export interface SearchResult<T> {
  data: T[]
  pagination: PaginationWithTotal
}

export interface SearchInput {
  page?: number
  pageSize?: number
  where?: string
}
