import type { ReactNode } from "react";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorFn?: (row: T) => unknown;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  page?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  sortBy?: string | null;
  sortDirection?: "asc" | "desc" | null;
  onSortChange?: (columnId: string) => void;
}
