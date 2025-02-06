export interface PaginatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  totalPages: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
