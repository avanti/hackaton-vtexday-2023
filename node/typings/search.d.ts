export interface IPagination {
  page: number
  pageSize: number
  total?: number
}

export interface ISearchResult<T> {
  data: T[]
  pagination: IPagination
}

export interface ISearchInput {
  page?: number
  pageSize?: number
  where?: string
}
