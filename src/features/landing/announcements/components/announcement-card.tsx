"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Announcement } from "../types";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { t } = useTranslate();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">{t(announcement.titleKey)}</CardTitle>
            <p className="text-xs text-muted-foreground">{t(announcement.dateKey)}</p>
          </div>
          {announcement.badgeKey && (
            <Badge variant="secondary">{t(announcement.badgeKey)}</Badge>
          )}
        </div>
        <CardDescription className="mt-2 leading-relaxed">
          {t(announcement.descriptionKey)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
