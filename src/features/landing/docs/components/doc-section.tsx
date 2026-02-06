"use client";

import { useTranslate } from "@/features/i18n";
import { Separator } from "@/components/ui/separator";
import type { DocSection } from "../types";

interface DocSectionComponentProps {
  section: DocSection;
  isLast?: boolean;
}

export function DocSectionComponent({ section, isLast }: DocSectionComponentProps) {
  const { t } = useTranslate();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{t(section.headingKey)}</h2>
        <p className="text-muted-foreground">{t(section.descriptionKey)}</p>
      </div>
      <div className="space-y-4">
        {section.steps.map((step, i) => (
          <div key={step.titleKey} className="space-y-2">
            <h3 className="text-sm font-semibold">
              {i + 1}. {t(step.titleKey)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(step.contentKey)}
            </p>
            {step.codeKey && (
              <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
                {t(step.codeKey)}
              </pre>
            )}
          </div>
        ))}
      </div>
      {!isLast && <Separator />}
    </div>
  );
}
