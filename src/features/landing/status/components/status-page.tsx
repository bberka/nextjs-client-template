"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ServiceStatusCard } from "./service-status-card";
import { IncidentCard } from "./incident-card";
import type { ServiceStatusItem, Incident } from "../types";

const SERVICES: ServiceStatusItem[] = [
  { id: "1", nameKey: "landing.status.service1.name", status: "operational", statusKey: "landing.status.service1.status" },
  { id: "2", nameKey: "landing.status.service2.name", status: "operational", statusKey: "landing.status.service2.status" },
  { id: "3", nameKey: "landing.status.service3.name", status: "operational", statusKey: "landing.status.service3.status" },
  { id: "4", nameKey: "landing.status.service4.name", status: "degraded", statusKey: "landing.status.service4.status" },
  { id: "5", nameKey: "landing.status.service5.name", status: "operational", statusKey: "landing.status.service5.status" },
];

const RECENT_INCIDENTS: Incident[] = [
  {
    id: "1",
    titleKey: "landing.status.incident1.title",
    descriptionKey: "landing.status.incident1.description",
    dateKey: "landing.status.incident1.date",
    badgeKey: "landing.status.incident1.badge",
  },
  {
    id: "2",
    titleKey: "landing.status.incident2.title",
    descriptionKey: "landing.status.incident2.description",
    dateKey: "landing.status.incident2.date",
    badgeKey: "landing.status.incident2.badge",
  },
  {
    id: "3",
    titleKey: "landing.status.incident3.title",
    descriptionKey: "landing.status.incident3.description",
    dateKey: "landing.status.incident3.date",
    badgeKey: "landing.status.incident3.badge",
  },
];

export function StatusPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.status.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.status.subtitle")}
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="flex items-center gap-3 p-4">
            <span className="size-3 rounded-full bg-green-500" />
            <span className="font-medium">{t("landing.status.allOperational")}</span>
            <Badge variant="secondary" className="ml-auto">
              {t("landing.status.lastChecked")}
            </Badge>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">{t("landing.status.servicesHeading")}</h2>
          {SERVICES.map((service) => (
            <ServiceStatusCard key={service.id} service={service} />
          ))}
        </div>

        <Separator className="my-8" />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{t("landing.status.incidentsHeading")}</h2>
          {RECENT_INCIDENTS.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </div>
  );
}
