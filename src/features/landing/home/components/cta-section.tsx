"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth";
import { useLocalizedRoute, useTranslate } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <section className="border-t bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("landing.home.cta.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("landing.home.cta.subtitle")}
        </p>
        <div className="mt-8">
          {isAuthenticated ? (
            <Button size="lg" asChild>
              <Link href={lr(ROUTES.DASHBOARD)}>
                {t("landing.home.hero.goToDashboard")}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link href={lr(ROUTES.REGISTER)}>
                {t("landing.home.cta.button")}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
