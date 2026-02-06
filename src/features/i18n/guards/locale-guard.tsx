"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../types";

export function LocaleGuard({ children }: { children: ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  useEffect(() => {
    if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
      router.replace(`/${DEFAULT_LOCALE}`);
    }
  }, [locale, router]);

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return null;
  }

  return <>{children}</>;
}
