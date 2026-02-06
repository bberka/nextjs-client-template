"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Zap, Globe, LayoutDashboard, Users, Lock } from "lucide-react";

const FEATURE_ICONS = [Shield, Zap, Globe, LayoutDashboard, Users, Lock];

export function FeaturesSection() {
  const { t } = useTranslate();

  const features = Array.from({ length: 6 }, (_, i) => ({
    titleKey: `landing.home.features.feature${i + 1}.title`,
    descriptionKey: `landing.home.features.feature${i + 1}.description`,
    Icon: FEATURE_ICONS[i],
  }));

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.home.features.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.home.features.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.titleKey} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.Icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{t(feature.titleKey)}</CardTitle>
                <CardDescription>{t(feature.descriptionKey)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
