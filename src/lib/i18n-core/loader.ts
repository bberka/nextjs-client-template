const cache = new Map<string, Record<string, string>>();

export async function loadTranslations(locale: string): Promise<Record<string, string>> {
  if (cache.has(locale)) return cache.get(locale)!;

  const response = await fetch(`/locales/${locale}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load translations for locale: ${locale}`);
  }

  const translations = (await response.json()) as Record<string, string>;
  cache.set(locale, translations);
  return translations;
}

export function clearTranslationCache() {
  cache.clear();
}
