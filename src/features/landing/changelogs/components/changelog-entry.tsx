"use client";

import { useTranslate } from "@/features/i18n";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ChangelogRelease, ChangeType } from "../types";

const TYPE_STYLES: Record<ChangeType, string> = {
  added: "bg-green-500/10 text-green-700 dark:text-green-400",
  changed: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  fixed: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  removed: "bg-red-500/10 text-red-700 dark:text-red-400",
};

interface ChangelogEntryProps {
  release: ChangelogRelease;
  isLast?: boolean;
}

export function ChangelogEntry({ release, isLast }: ChangelogEntryProps) {
  const { t } = useTranslate();

  return (
    <div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="font-mono text-sm">
          {release.version}
        </Badge>
        <span className="text-sm text-muted-foreground">{t(release.dateKey)}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold">{t(release.titleKey)}</h3>
      <ul className="mt-4 space-y-2">
        {release.changes.map((change, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Badge
              variant="secondary"
              className={cn("mt-0.5 shrink-0 text-xs", TYPE_STYLES[change.type])}
            >
              {t(`landing.changelogs.${change.type}`)}
            </Badge>
            <span>{t(change.descriptionKey)}</span>
          </li>
        ))}
      </ul>
      {!isLast && <Separator className="mt-8" />}
    </div>
  );
}
