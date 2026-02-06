"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function DataTablePagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        {totalCount} total result{totalCount !== 1 ? "s" : ""}
      </div>
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">Rows:</span>
            <select
              className="h-8 rounded-md border bg-background px-2 text-sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-xs" onClick={() => onPageChange(1)} disabled={page <= 1}>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" size="icon-xs" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-xs" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            <ChevronRight />
          </Button>
          <Button variant="outline" size="icon-xs" onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
