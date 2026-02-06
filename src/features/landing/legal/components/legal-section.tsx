"use client";

import { Separator } from "@/components/ui/separator";

interface LegalSectionProps {
  title: string;
  content: string;
  isLast?: boolean;
}

export function LegalSection({ title, content, isLast }: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground leading-relaxed">{content}</p>
      {!isLast && <Separator className="mt-6" />}
    </section>
  );
}
