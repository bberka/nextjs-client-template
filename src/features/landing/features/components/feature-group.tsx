"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import type { FeatureGroup } from "../types";

interface FeatureGroupComponentProps {
  group: FeatureGroup;
}

export function FeatureGroupComponent({ group }: FeatureGroupComponentProps) {
  const { t } = useTranslate();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{t(group.headingKey)}</h2>
        <p className="text-muted-foreground">{t(group.descriptionKey)}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {group.features.map((feature) => (
          <Card key={feature.titleKey} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{t(feature.titleKey)}</CardTitle>
              <CardDescription>{t(feature.descriptionKey)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {feature.includedKeys.map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 shrink-0 text-green-600 dark:text-green-400" />
                  <span>{t(key)}</span>
                </div>
              ))}
              {feature.excludedKeys?.map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X className="size-4 shrink-0 text-red-500 dark:text-red-400" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
