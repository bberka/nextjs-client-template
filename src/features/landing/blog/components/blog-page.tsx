"use client";

import { useTranslate } from "@/features/i18n";
import { BlogPostCard } from "./blog-post-card";
import type { BlogPost } from "../types";

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    titleKey: "landing.blog.post1.title",
    excerptKey: "landing.blog.post1.excerpt",
    dateKey: "landing.blog.post1.date",
    authorKey: "landing.blog.post1.author",
    tagKeys: ["landing.blog.post1.tag1", "landing.blog.post1.tag2"],
  },
  {
    id: "2",
    titleKey: "landing.blog.post2.title",
    excerptKey: "landing.blog.post2.excerpt",
    dateKey: "landing.blog.post2.date",
    authorKey: "landing.blog.post2.author",
    tagKeys: ["landing.blog.post2.tag1"],
  },
  {
    id: "3",
    titleKey: "landing.blog.post3.title",
    excerptKey: "landing.blog.post3.excerpt",
    dateKey: "landing.blog.post3.date",
    authorKey: "landing.blog.post3.author",
    tagKeys: ["landing.blog.post3.tag1", "landing.blog.post3.tag2"],
  },
  {
    id: "4",
    titleKey: "landing.blog.post4.title",
    excerptKey: "landing.blog.post4.excerpt",
    dateKey: "landing.blog.post4.date",
    authorKey: "landing.blog.post4.author",
    tagKeys: ["landing.blog.post4.tag1"],
  },
];

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
