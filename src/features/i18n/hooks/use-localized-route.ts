"use client";

import { useLocale } from "./use-locale";
import { localizedRoute } from "@/constants/routes";

export function useLocalizedRoute() {
  const { locale } = useLocale();

  function lr(route: string): string {
    return localizedRoute(locale, route);
  }

  return { lr };
}
