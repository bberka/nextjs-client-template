"use client";

import { useTranslate } from "@/features/i18n";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FaqItem } from "../types";

interface FaqItemComponentProps {
  faq: FaqItem;
}

export function FaqItemComponent({ faq }: FaqItemComponentProps) {
  const { t } = useTranslate();

  return (
    <AccordionItem value={faq.id}>
      <AccordionTrigger className="text-left">
        {t(faq.questionKey)}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed">
        {t(faq.answerKey)}
      </AccordionContent>
    </AccordionItem>
  );
}
