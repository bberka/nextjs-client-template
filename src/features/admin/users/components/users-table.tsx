"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@/components/data-table/types";
import type { AdminUser } from "../types";
import { formatDate } from "@/lib/format";

interface UsersTableProps {
  data: AdminUser[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export function UsersTable({
  data,
  isLoading,
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: UsersTableProps) {
  const columns: ColumnDef<AdminUser>[] = [
    { id: "name", header: "Name", accessorFn: (row) => row.name, sortable: true },
    { id: "email", header: "Email", accessorFn: (row) => row.email, sortable: true },
    { id: "role", header: "Role", accessorFn: (row) => row.role },
    {
      id: "createdAt",
      header: "Created",
      cell: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      id: "actions",
      header: "",
      cell: (row) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon-xs" onClick={() => onEdit(row)}>
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={() => onDelete(row)}>
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      totalCount={totalCount}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
