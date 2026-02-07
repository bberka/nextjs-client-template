"use client";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslate } from "@/features/i18n";
import { SeverityLevel } from "@/types/api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDeleteUser } from "../hooks/use-delete-user";
import { useUsersList } from "../hooks/use-users-list";
import type { AdminUser } from "../types";
import { UserFormDialog } from "./user-form-dialog";
import { UsersTable } from "./users-table";

export function UsersPage() {
  const { t } = useTranslate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const { data: result, isLoading } = useUsersList({ page, size: pageSize, search });
  const deleteMutation = useDeleteUser();

  const paged = result?.severity === SeverityLevel.Success ? result.value : null;

  function handleEdit(user: AdminUser) {
    setEditUser(user);
    setFormOpen(true);
  }

  function handleCreate() {
    setEditUser(null);
    setFormOpen(true);
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("admin.users.title")}
        description={t("admin.users.description")}
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="size-4" />
            {t("admin.users.create")}
          </Button>
        }
      />
      <div className="max-w-xs">
        <Input
          type="text"
          placeholder={t("common.search")}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
      <UsersTable
        data={paged?.items ?? []}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        totalCount={paged?.totalCount ?? 0}
        totalPages={paged?.totalPages ?? 1}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        onEdit={handleEdit}
        onDelete={setDeleteTarget}
      />
      <UserFormDialog open={formOpen} onOpenChange={setFormOpen} user={editUser} />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title={t("admin.users.delete")}
        description={t("admin.users.deleteConfirm")}
        variant="destructive"
        confirmLabel={t("common.delete")}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
