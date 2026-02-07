"use client";

import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/types";
import { FormField } from "@/components/shared/form-field";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslate } from "@/features/i18n";
import { SeverityLevel } from "@/types/api";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useCreateRole } from "../hooks/use-create-role";
import { useRolesList } from "../hooks/use-roles-list";
import { useUpdateRole } from "../hooks/use-update-role";
import type { Role } from "../types";

export function RolesPage() {
  const { t } = useTranslate();
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [name, setName] = useState("");

  const { data: result, isLoading } = useRolesList({ page, size: 10 });
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const paged = result?.severity === SeverityLevel.Success ? result.value : null;

  function handleCreate() {
    setEditRole(null);
    setName("");
    setFormOpen(true);
  }

  function handleEdit(role: Role) {
    setEditRole(role);
    setName(role.name);
    setFormOpen(true);
  }

  async function handleSubmit() {
    if (editRole) {
      const res = await updateMutation.mutateAsync({ id: editRole.id, data: { name, permissions: editRole.permissions } });
      if (res.severity === SeverityLevel.Success) setFormOpen(false);
    } else {
      const res = await createMutation.mutateAsync({ name, permissions: [] });
      if (res.severity === SeverityLevel.Success) setFormOpen(false);
    }
  }

  const columns: ColumnDef<Role>[] = [
    { id: "name", header: "Name", accessorFn: (row) => row.name },
    { id: "permissions", header: "Permissions", cell: (row) => row.permissions.join(", ") || "—" },
    {
      id: "actions",
      header: "",
      cell: (row) => (
        <Button variant="ghost" size="icon-xs" onClick={() => handleEdit(row)}>
          <Pencil />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("admin.roles.title")}
        description={t("admin.roles.description")}
        actions={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="size-4" />
            {t("admin.roles.create")}
          </Button>
        }
      />
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
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editRole ? t("admin.roles.edit") : t("admin.roles.create")}</DialogTitle>
          </DialogHeader>
          <FormField label="Role Name" htmlFor="roleName">
            <Input
              id="roleName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </FormField>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSubmit} disabled={!name || createMutation.isPending || updateMutation.isPending}>
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
