"use client";

import { useAuthStore } from "@/features/auth";
import { useTranslate } from "@/features/i18n";
import { PageHeader } from "@/components/shared/page-header";
import { Users, Shield, ScrollText } from "lucide-react";

export function DashboardPage() {
  const { t } = useTranslate();
  const user = useAuthStore((s) => s.user);

  const stats = [
    { label: t("dashboard.totalUsers"), value: "2", icon: <Users className="size-5 text-muted-foreground" /> },
    { label: t("dashboard.activeRoles"), value: "2", icon: <Shield className="size-5 text-muted-foreground" /> },
    { label: t("dashboard.recentActivity"), value: "4", icon: <ScrollText className="size-5 text-muted-foreground" /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t("dashboard.title")} description={t("dashboard.welcome", { name: user?.name ?? "" })} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.icon}
            </div>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
