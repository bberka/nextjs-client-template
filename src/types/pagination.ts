export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export interface PagedListRequest {
  page?: number;
  size?: number;
  search?: string | null;
  sort?: SortDirection | null;
  sortBy?: string | null;
}

export interface PagedListResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}
