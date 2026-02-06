import { loadTranslations } from "@/lib/i18n-core/loader";

export function fetchTranslations(locale: string) {
  return loadTranslations(locale);
}
