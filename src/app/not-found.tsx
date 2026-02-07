"use client";

import { DEFAULT_LOCALE, useTranslate, type Locale } from "@/features/i18n";
import { useState } from "react";

export default function NotFound() {
  const [locale] = useState<Locale>(DEFAULT_LOCALE);

  const { t } = useTranslate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("notFound.title")}
      </h1>
      <p className="text-muted-foreground mt-4 text-center text-base">
        {t("notFound.description")}
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href={`/${locale}`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors"
        >
          {t("notFound.goHome")}
        </a>
        <button
          onClick={() => window.history.back()}
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 cursor-pointer items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors"
        >
          {t("notFound.goBack")}
        </button>
      </div>
    </div>
  );
}
