"use client";

import { useTranslate } from "@/features/i18n";
import { AnnouncementCard } from "./announcement-card";
import type { Announcement } from "../types";

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    titleKey: "landing.announcements.item1.title",
    descriptionKey: "landing.announcements.item1.description",
    dateKey: "landing.announcements.item1.date",
    badgeKey: "landing.announcements.item1.badge",
  },
  {
    id: "2",
    titleKey: "landing.announcements.item2.title",
    descriptionKey: "landing.announcements.item2.description",
    dateKey: "landing.announcements.item2.date",
    badgeKey: "landing.announcements.item2.badge",
  },
  {
    id: "3",
    titleKey: "landing.announcements.item3.title",
    descriptionKey: "landing.announcements.item3.description",
    dateKey: "landing.announcements.item3.date",
  },
  {
    id: "4",
    titleKey: "landing.announcements.item4.title",
    descriptionKey: "landing.announcements.item4.description",
    dateKey: "landing.announcements.item4.date",
  },
];

export function AnnouncementsPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.announcements.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.announcements.subtitle")}
          </p>
        </div>
        <div className="space-y-4">
          {ANNOUNCEMENTS.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </div>
  );
}
