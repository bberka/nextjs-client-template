"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "./use-locale";
import { loadTranslations } from "@/lib/i18n-core/loader";
import { interpolate } from "@/lib/i18n-core/parser";
import { useCallback } from "react";

export function useTranslate() {
  const { locale } = useLocale();

  const { data: translations } = useQuery({
    queryKey: ["translations", locale],
    queryFn: () => loadTranslations(locale),
    staleTime: Infinity,
  });

  const t = useCallback(
    (key: string, args?: Record<string, string | number | boolean>): string => {
      const template = translations?.[key] ?? key;
      return interpolate(template, args);
    },
    [translations],
  );

  return { t };
}
