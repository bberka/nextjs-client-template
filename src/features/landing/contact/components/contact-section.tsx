"use client";

import { useTranslate } from "@/features/i18n";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import type { ContactSection } from "../types";

interface ContactSectionCardProps {
  section: ContactSection;
}

export function ContactSectionCard({ section }: ContactSectionCardProps) {
  const { t } = useTranslate();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Mail className="size-5 text-primary" />
        </div>
        <CardTitle className="text-lg">{t(section.titleKey)}</CardTitle>
        <CardDescription className="leading-relaxed">
          {t(section.descriptionKey)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <a
          href={`mailto:${t(section.emailKey)}`}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t(section.emailKey)}
        </a>
      </CardContent>
    </Card>
  );
}
