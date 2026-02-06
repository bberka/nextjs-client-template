"use client";

import { useTranslate } from "@/features/i18n";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "../types";

interface PlanCardProps {
  plan: PricingPlan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const { t } = useTranslate();

  return (
    <Card
      className={cn(
        "flex flex-col transition-shadow hover:shadow-md",
        plan.highlighted && "border-primary shadow-md",
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{t(plan.nameKey)}</CardTitle>
          {plan.badgeKey && (
            <Badge variant="default">{t(plan.badgeKey)}</Badge>
          )}
        </div>
        <div className="mt-2">
          <span className="text-3xl font-bold">{t(plan.priceKey)}</span>
        </div>
        <CardDescription className="mt-2">{t(plan.descriptionKey)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.featureKeys.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={plan.highlighted ? "default" : "outline"}
        >
          {t(plan.ctaKey)}
        </Button>
      </CardFooter>
    </Card>
  );
}
