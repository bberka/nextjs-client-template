"use client";

import { useTranslate } from "@/features/i18n";
import { BlogPostCard } from "./blog-post-card";
import { BLOG_POSTS } from "../data";

export function BlogPage() {
  const { t } = useTranslate();

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.blog.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("landing.blog.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
