"use client";

import { useTranslate } from "@/features/i18n";
import { PlanCard } from "./plan-card";
import type { PricingPlan } from "../types";

const PLANS: PricingPlan[] = [
  {
    nameKey: "landing.pricing.free.name",
    priceKey: "landing.pricing.free.price",
    descriptionKey: "landing.pricing.free.description",
    featureKeys: [
      "landing.pricing.free.feature1",
      "landing.pricing.free.feature2",
      "landing.pricing.free.feature3",
      "landing.pricing.free.feature4",
    ],
    ctaKey: "landing.pricing.free.cta",
  },
  {
    nameKey: "landing.pricing.pro.name",
    priceKey: "landing.pricing.pro.price",
    descriptionKey: "landing.pricing.pro.description",
    highlighted: true,
    badgeKey: "landing.pricing.pro.badge",
    featureKeys: [
      "landing.pricing.pro.feature1",
      "landing.pricing.pro.feature2",
      "landing.pricing.pro.feature3",
      "landing.pricing.pro.feature4",
      "landing.pricing.pro.feature5",
      "landing.pricing.pro.feature6",
    ],
    ctaKey: "landing.pricing.pro.cta",
  },
  {
    nameKey: "landing.pricing.enterprise.name",
    priceKey: "landing.pricing.enterprise.price",
    descriptionKey: "landing.pricing.enterprise.description",
    featureKeys: [
      "landing.pricing.enterprise.feature1",
      "landing.pricing.enterprise.feature2",
      "landing.pricing.enterprise.feature3",
      "landing.pricing.enterprise.feature4",
      "landing.pricing.enterprise.feature5",
      "landing.pricing.enterprise.feature6",
      "landing.pricing.enterprise.feature7",
      "landing.pricing.enterprise.feature8",
    ],
    ctaKey: "landing.pricing.enterprise.cta",
  },
];

export function PricingPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.pricing.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.pricing.subtitle")}
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.nameKey} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
