"use client";

import { useTranslate } from "@/features/i18n";
import { RoadmapColumnComponent } from "./roadmap-column";
import type { RoadmapColumn } from "../types";

const ROADMAP_COLUMNS: RoadmapColumn[] = [
  {
    id: "now",
    headingKey: "landing.roadmap.now.heading",
    descriptionKey: "landing.roadmap.now.description",
    items: [
      {
        id: "now-1",
        titleKey: "landing.roadmap.now.item1.title",
        descriptionKey: "landing.roadmap.now.item1.description",
        badgeKey: "landing.roadmap.now.item1.badge",
      },
      {
        id: "now-2",
        titleKey: "landing.roadmap.now.item2.title",
        descriptionKey: "landing.roadmap.now.item2.description",
      },
      {
        id: "now-3",
        titleKey: "landing.roadmap.now.item3.title",
        descriptionKey: "landing.roadmap.now.item3.description",
      },
    ],
  },
  {
    id: "next",
    headingKey: "landing.roadmap.next.heading",
    descriptionKey: "landing.roadmap.next.description",
    items: [
      {
        id: "next-1",
        titleKey: "landing.roadmap.next.item1.title",
        descriptionKey: "landing.roadmap.next.item1.description",
      },
      {
        id: "next-2",
        titleKey: "landing.roadmap.next.item2.title",
        descriptionKey: "landing.roadmap.next.item2.description",
        badgeKey: "landing.roadmap.next.item2.badge",
      },
      {
        id: "next-3",
        titleKey: "landing.roadmap.next.item3.title",
        descriptionKey: "landing.roadmap.next.item3.description",
      },
    ],
  },
  {
    id: "later",
    headingKey: "landing.roadmap.later.heading",
    descriptionKey: "landing.roadmap.later.description",
    items: [
      {
        id: "later-1",
        titleKey: "landing.roadmap.later.item1.title",
        descriptionKey: "landing.roadmap.later.item1.description",
      },
      {
        id: "later-2",
        titleKey: "landing.roadmap.later.item2.title",
        descriptionKey: "landing.roadmap.later.item2.description",
      },
    ],
  },
];

export function RoadmapPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.roadmap.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.roadmap.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ROADMAP_COLUMNS.map((column) => (
            <RoadmapColumnComponent key={column.id} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}
