"use client";

import { useTranslate } from "@/features/i18n";
import { DocSectionComponent } from "./doc-section";
import type { DocSection } from "../types";

const DOC_SECTIONS: DocSection[] = [
  {
    id: "getting-started",
    headingKey: "landing.docs.section1.heading",
    descriptionKey: "landing.docs.section1.description",
    steps: [
      {
        titleKey: "landing.docs.section1.step1.title",
        contentKey: "landing.docs.section1.step1.content",
        codeKey: "landing.docs.section1.step1.code",
      },
      {
        titleKey: "landing.docs.section1.step2.title",
        contentKey: "landing.docs.section1.step2.content",
        codeKey: "landing.docs.section1.step2.code",
      },
      {
        titleKey: "landing.docs.section1.step3.title",
        contentKey: "landing.docs.section1.step3.content",
        codeKey: "landing.docs.section1.step3.code",
      },
    ],
  },
  {
    id: "configuration",
    headingKey: "landing.docs.section2.heading",
    descriptionKey: "landing.docs.section2.description",
    steps: [
      {
        titleKey: "landing.docs.section2.step1.title",
        contentKey: "landing.docs.section2.step1.content",
        codeKey: "landing.docs.section2.step1.code",
      },
      {
        titleKey: "landing.docs.section2.step2.title",
        contentKey: "landing.docs.section2.step2.content",
      },
      {
        titleKey: "landing.docs.section2.step3.title",
        contentKey: "landing.docs.section2.step3.content",
        codeKey: "landing.docs.section2.step3.code",
      },
    ],
  },
  {
    id: "deployment",
    headingKey: "landing.docs.section3.heading",
    descriptionKey: "landing.docs.section3.description",
    steps: [
      {
        titleKey: "landing.docs.section3.step1.title",
        contentKey: "landing.docs.section3.step1.content",
        codeKey: "landing.docs.section3.step1.code",
      },
      {
        titleKey: "landing.docs.section3.step2.title",
        contentKey: "landing.docs.section3.step2.content",
      },
    ],
  },
];

export function DocsPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.docs.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.docs.subtitle")}
          </p>
        </div>
        <div className="space-y-10">
          {DOC_SECTIONS.map((section, i) => (
            <DocSectionComponent
              key={section.id}
              section={section}
              isLast={i === DOC_SECTIONS.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
