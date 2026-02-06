"use client";

import Link from "next/link";
import { useTranslate, useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "../types";

interface BlogDetailPageProps {
  post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={lr(ROUTES.BLOG)}>
            <ArrowLeft className="mr-2 size-4" />
            {t("landing.blog.backToBlog")}
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t(post.titleKey)}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t(post.authorKey)}</span>
              <span>&middot;</span>
              <span>{t(post.dateKey)}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tagKeys.map((tagKey) => (
                <Badge key={tagKey} variant="outline">
                  {t(tagKey)}
                </Badge>
              ))}
            </div>
          </header>

          <Separator className="mb-8" />

          <div className="space-y-6 leading-relaxed text-muted-foreground">
            {post.contentKeys.map((contentKey) => (
              <p key={contentKey}>{t(contentKey)}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
