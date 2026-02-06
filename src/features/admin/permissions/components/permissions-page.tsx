"use client";

import { usePermissionsList } from "../hooks/use-permissions-list";
import { useTranslate } from "@/features/i18n";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SeverityLevel } from "@/types/api";

export function PermissionsPage() {
  const { t } = useTranslate();
  const { data: result, isLoading } = usePermissionsList();

  const permissions = result?.severity === SeverityLevel.Success ? result.value : null;

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="space-y-6">
      <PageHeader title={t("admin.permissions.title")} description={t("admin.permissions.description")} />
      <div className="rounded-md border p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {permissions?.map((perm) => (
            <div key={perm} className="rounded-md bg-muted px-3 py-2 text-sm font-mono">
              {perm}
            </div>
          ))}
        </div>
        {!permissions?.length && (
          <p className="text-sm text-muted-foreground">{t("common.noResults")}</p>
        )}
      </div>
    </div>
  );
}
