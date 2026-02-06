"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth";
import { useLocalizedRoute, useTranslate } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {t("landing.home.hero.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t("landing.home.hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                {t("landing.home.hero.getStarted")}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
          <Button variant="outline" size="lg" asChild>
            <Link href={lr(ROUTES.PRICING)}>{t("landing.home.hero.learnMore")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
