"use client";

import { useState } from "react";
import { useTranslate } from "@/features/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FeedbackCategory, FeedbackCategoryOption } from "../types";

const CATEGORIES: FeedbackCategoryOption[] = [
  { value: "feature", labelKey: "landing.feedback.categoryFeature" },
  { value: "bug", labelKey: "landing.feedback.categoryBug" },
  { value: "improvement", labelKey: "landing.feedback.categoryImprovement" },
  { value: "other", labelKey: "landing.feedback.categoryOther" },
];

export function FeedbackPage() {
  const { t } = useTranslate();
  const [category, setCategory] = useState<FeedbackCategory>("feature");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.feedback.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.feedback.subtitle")}
          </p>
        </div>

        {submitted ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg font-medium">{t("landing.feedback.successMessage")}</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("landing.feedback.nameLabel")}</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("landing.feedback.emailLabel")}</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t("landing.feedback.categoryLabel")}</Label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <Button
                        key={cat.value}
                        type="button"
                        variant={category === cat.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory(cat.value)}
                        className={cn(category === cat.value && "shadow-sm")}
                      >
                        {t(cat.labelKey)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t("landing.feedback.subjectLabel")}</Label>
                  <Input id="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("landing.feedback.messageLabel")}</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={t("landing.feedback.messagePlaceholder")}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t("landing.feedback.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
