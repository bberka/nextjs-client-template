import { BLOG_POSTS } from "@/features/landing/blog/data";
import { BlogDetailPage } from "@/features/landing/blog/components/blog-detail-page";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  return <BlogDetailPage post={post} />;
}
