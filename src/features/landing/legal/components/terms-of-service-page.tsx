"use client";

import { useTranslate } from "@/features/i18n";
import { LegalSection } from "./legal-section";

const SECTION_COUNT = 6;

export function TermsOfServicePage() {
  const { t } = useTranslate();

  const sections = Array.from({ length: SECTION_COUNT }, (_, i) => ({
    titleKey: `landing.legal.terms.section${i + 1}.title`,
    contentKey: `landing.legal.terms.section${i + 1}.content`,
  }));

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.legal.terms.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("landing.legal.terms.lastUpdated")}
          </p>
        </div>
        <div className="space-y-8">
          {sections.map((section, i) => (
            <LegalSection
              key={section.titleKey}
              title={t(section.titleKey)}
              content={t(section.contentKey)}
              isLast={i === sections.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
