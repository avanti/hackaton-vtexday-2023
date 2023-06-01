export interface Pagination {
  page: number
  pageSize: number
  total?: number
}

export interface ISearchResult<T> {
  data: T[]
  pagination: Pagination
}

export interface SeachInput {
  page?: number
  pageSize?: number
  where?: string
}
