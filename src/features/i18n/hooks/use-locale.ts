"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import type { Locale } from "../types";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../types";

export function useLocale() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const locale = (params.locale as Locale) ?? DEFAULT_LOCALE;

  function setLocale(newLocale: Locale) {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return { locale, setLocale, supportedLocales: SUPPORTED_LOCALES };
}
