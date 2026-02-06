"use client";

import Link from "next/link";
import { useTranslate, useLocale } from "@/features/i18n";
import { blogDetailRoute } from "@/constants/routes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "../types";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { t } = useTranslate();
  const { locale } = useLocale();

  return (
    <Link href={blogDetailRoute(locale, post.slug)} className="block">
      <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg leading-snug">{t(post.titleKey)}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{t(post.authorKey)}</span>
            <span>&middot;</span>
            <span>{t(post.dateKey)}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="leading-relaxed">
            {t(post.excerptKey)}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex-wrap gap-2">
          {post.tagKeys.map((tagKey) => (
            <Badge key={tagKey} variant="outline">
              {t(tagKey)}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
