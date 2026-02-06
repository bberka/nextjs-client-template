"use client";

import { useTranslate } from "@/features/i18n";
import { ContactSectionCard } from "./contact-section";
import type { ContactSection } from "../types";

const CONTACT_SECTIONS: ContactSection[] = [
  {
    id: "sales",
    titleKey: "landing.contact.sales.title",
    descriptionKey: "landing.contact.sales.description",
    emailKey: "landing.contact.sales.email",
  },
  {
    id: "support",
    titleKey: "landing.contact.support.title",
    descriptionKey: "landing.contact.support.description",
    emailKey: "landing.contact.support.email",
  },
  {
    id: "security",
    titleKey: "landing.contact.security.title",
    descriptionKey: "landing.contact.security.description",
    emailKey: "landing.contact.security.email",
  },
  {
    id: "abuse",
    titleKey: "landing.contact.abuse.title",
    descriptionKey: "landing.contact.abuse.description",
    emailKey: "landing.contact.abuse.email",
  },
];

export function ContactPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.contact.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.contact.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CONTACT_SECTIONS.map((section) => (
            <ContactSectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
