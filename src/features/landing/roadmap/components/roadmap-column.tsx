"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RoadmapColumn } from "../types";

interface RoadmapColumnProps {
  column: RoadmapColumn;
}

export function RoadmapColumnComponent({ column }: RoadmapColumnProps) {
  const { t } = useTranslate();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{t(column.headingKey)}</h2>
        <p className="text-sm text-muted-foreground">{t(column.descriptionKey)}</p>
      </div>
      <div className="space-y-3">
        {column.items.map((item) => (
          <Card key={item.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="p-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-medium">{t(item.titleKey)}</CardTitle>
                {item.badgeKey && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {t(item.badgeKey)}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs">{t(item.descriptionKey)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
