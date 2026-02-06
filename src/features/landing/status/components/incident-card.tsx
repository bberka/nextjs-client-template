"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Incident } from "../types";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const { t } = useTranslate();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium">{t(incident.titleKey)}</CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {t(incident.badgeKey)}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{t(incident.dateKey)}</p>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {t(incident.descriptionKey)}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
