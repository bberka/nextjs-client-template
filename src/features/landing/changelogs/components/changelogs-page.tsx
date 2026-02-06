"use client";

import { useTranslate } from "@/features/i18n";
import { ChangelogEntry } from "./changelog-entry";
import type { ChangelogRelease } from "../types";

const RELEASES: ChangelogRelease[] = [
  {
    version: "v2.0.0",
    dateKey: "landing.changelogs.release1.date",
    titleKey: "landing.changelogs.release1.title",
    changes: [
      { type: "added", descriptionKey: "landing.changelogs.release1.change1" },
      { type: "added", descriptionKey: "landing.changelogs.release1.change2" },
      { type: "changed", descriptionKey: "landing.changelogs.release1.change3" },
      { type: "fixed", descriptionKey: "landing.changelogs.release1.change4" },
    ],
  },
  {
    version: "v1.2.0",
    dateKey: "landing.changelogs.release2.date",
    titleKey: "landing.changelogs.release2.title",
    changes: [
      { type: "added", descriptionKey: "landing.changelogs.release2.change1" },
      { type: "changed", descriptionKey: "landing.changelogs.release2.change2" },
      { type: "fixed", descriptionKey: "landing.changelogs.release2.change3" },
    ],
  },
  {
    version: "v1.1.0",
    dateKey: "landing.changelogs.release3.date",
    titleKey: "landing.changelogs.release3.title",
    changes: [
      { type: "added", descriptionKey: "landing.changelogs.release3.change1" },
      { type: "fixed", descriptionKey: "landing.changelogs.release3.change2" },
      { type: "removed", descriptionKey: "landing.changelogs.release3.change3" },
    ],
  },
  {
    version: "v1.0.0",
    dateKey: "landing.changelogs.release4.date",
    titleKey: "landing.changelogs.release4.title",
    changes: [
      { type: "added", descriptionKey: "landing.changelogs.release4.change1" },
      { type: "added", descriptionKey: "landing.changelogs.release4.change2" },
      { type: "added", descriptionKey: "landing.changelogs.release4.change3" },
    ],
  },
];

export function ChangelogsPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.changelogs.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.changelogs.subtitle")}
          </p>
        </div>
        <div className="space-y-8">
          {RELEASES.map((release, i) => (
            <ChangelogEntry
              key={release.version}
              release={release}
              isLast={i === RELEASES.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
