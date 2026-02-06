"use client";

import { useTranslate } from "@/features/i18n";
import { Accordion } from "@/components/ui/accordion";
import { FaqItemComponent } from "./faq-item";
import type { FaqItem } from "../types";

const FAQ_ITEMS: FaqItem[] = [
  { id: "1", questionKey: "landing.faqs.item1.question", answerKey: "landing.faqs.item1.answer" },
  { id: "2", questionKey: "landing.faqs.item2.question", answerKey: "landing.faqs.item2.answer" },
  { id: "3", questionKey: "landing.faqs.item3.question", answerKey: "landing.faqs.item3.answer" },
  { id: "4", questionKey: "landing.faqs.item4.question", answerKey: "landing.faqs.item4.answer" },
  { id: "5", questionKey: "landing.faqs.item5.question", answerKey: "landing.faqs.item5.answer" },
  { id: "6", questionKey: "landing.faqs.item6.question", answerKey: "landing.faqs.item6.answer" },
  { id: "7", questionKey: "landing.faqs.item7.question", answerKey: "landing.faqs.item7.answer" },
  { id: "8", questionKey: "landing.faqs.item8.question", answerKey: "landing.faqs.item8.answer" },
];

export function FaqsPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.faqs.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.faqs.subtitle")}
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((faq) => (
            <FaqItemComponent key={faq.id} faq={faq} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
