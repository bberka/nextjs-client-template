"use client";

import { useTranslate } from "@/features/i18n";
import { FeatureGroupComponent } from "./feature-group";
import type { FeatureGroup } from "../types";

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "core",
    headingKey: "landing.features.group1.heading",
    descriptionKey: "landing.features.group1.description",
    features: [
      {
        titleKey: "landing.features.group1.feature1.title",
        descriptionKey: "landing.features.group1.feature1.description",
        includedKeys: [
          "landing.features.group1.feature1.included1",
          "landing.features.group1.feature1.included2",
          "landing.features.group1.feature1.included3",
        ],
        excludedKeys: [
          "landing.features.group1.feature1.excluded1",
        ],
      },
      {
        titleKey: "landing.features.group1.feature2.title",
        descriptionKey: "landing.features.group1.feature2.description",
        includedKeys: [
          "landing.features.group1.feature2.included1",
          "landing.features.group1.feature2.included2",
        ],
        excludedKeys: [
          "landing.features.group1.feature2.excluded1",
        ],
      },
    ],
  },
  {
    id: "dx",
    headingKey: "landing.features.group2.heading",
    descriptionKey: "landing.features.group2.description",
    features: [
      {
        titleKey: "landing.features.group2.feature1.title",
        descriptionKey: "landing.features.group2.feature1.description",
        includedKeys: [
          "landing.features.group2.feature1.included1",
          "landing.features.group2.feature1.included2",
          "landing.features.group2.feature1.included3",
        ],
      },
      {
        titleKey: "landing.features.group2.feature2.title",
        descriptionKey: "landing.features.group2.feature2.description",
        includedKeys: [
          "landing.features.group2.feature2.included1",
          "landing.features.group2.feature2.included2",
        ],
        excludedKeys: [
          "landing.features.group2.feature2.excluded1",
        ],
      },
    ],
  },
  {
    id: "security",
    headingKey: "landing.features.group3.heading",
    descriptionKey: "landing.features.group3.description",
    features: [
      {
        titleKey: "landing.features.group3.feature1.title",
        descriptionKey: "landing.features.group3.feature1.description",
        includedKeys: [
          "landing.features.group3.feature1.included1",
          "landing.features.group3.feature1.included2",
          "landing.features.group3.feature1.included3",
        ],
      },
      {
        titleKey: "landing.features.group3.feature2.title",
        descriptionKey: "landing.features.group3.feature2.description",
        includedKeys: [
          "landing.features.group3.feature2.included1",
          "landing.features.group3.feature2.included2",
        ],
        excludedKeys: [
          "landing.features.group3.feature2.excluded1",
        ],
      },
    ],
  },
];

export function FeaturesPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.features.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.features.subtitle")}
          </p>
        </div>
        <div className="space-y-16">
          {FEATURE_GROUPS.map((group) => (
            <FeatureGroupComponent key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}
