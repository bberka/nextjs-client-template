"use client";

import { cn } from "@/lib/utils";
import { useTranslate } from "@/features/i18n";
import type { ServiceStatusItem, ServiceStatus } from "../types";

const STATUS_STYLES: Record<ServiceStatus, string> = {
  operational: "bg-green-500",
  degraded: "bg-yellow-500",
  outage: "bg-red-500",
  maintenance: "bg-blue-500",
};

interface ServiceStatusCardProps {
  service: ServiceStatusItem;
}

export function ServiceStatusCard({ service }: ServiceStatusCardProps) {
  const { t } = useTranslate();

  return (
    <div className="flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="text-sm font-medium">{t(service.nameKey)}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{t(service.statusKey)}</span>
        <span className={cn("size-2.5 rounded-full", STATUS_STYLES[service.status])} />
      </div>
    </div>
  );
}
