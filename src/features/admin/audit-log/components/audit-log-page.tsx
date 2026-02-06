"use client";

import { useState } from "react";
import { useAuditLog } from "../hooks/use-audit-log";
import { useTranslate } from "@/features/i18n";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { SeverityLevel } from "@/types/api";
import { formatDateTime } from "@/lib/format";
import type { ColumnDef } from "@/components/data-table/types";
import type { AuditEntry } from "../types";

export function AuditLogPage() {
  const { t } = useTranslate();
  const [page, setPage] = useState(1);

  const { data: result, isLoading } = useAuditLog({ page, size: 10 });
  const paged = result?.severity === SeverityLevel.Success ? result.value : null;

  const columns: ColumnDef<AuditEntry>[] = [
    { id: "action", header: "Action", accessorFn: (row) => row.action },
    { id: "target", header: "Target", accessorFn: (row) => row.target },
    { id: "details", header: "Details", accessorFn: (row) => row.details },
    { id: "userId", header: "User ID", accessorFn: (row) => row.userId },
    { id: "timestamp", header: "Time", cell: (row) => formatDateTime(row.timestamp) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t("admin.auditLog.title")} description={t("admin.auditLog.description")} />
      <DataTable
        columns={columns}
        data={paged?.items ?? []}
        isLoading={isLoading}
        page={page}
        pageSize={10}
        totalCount={paged?.totalCount ?? 0}
        totalPages={paged?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
