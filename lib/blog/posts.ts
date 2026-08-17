import type { BlogPost } from "@/lib/blog/types";
import { seedPosts } from "@/lib/blog/posts/seed";
import { batch1Posts } from "@/lib/blog/posts/batch1";
import { batch2Posts } from "@/lib/blog/posts/batch2";
import { batch3Posts } from "@/lib/blog/posts/batch3";
import { batch4Posts } from "@/lib/blog/posts/batch4";
import { batch5Posts } from "@/lib/blog/posts/batch5";
import { batch6Posts } from "@/lib/blog/posts/batch6";

export const allPosts: BlogPost[] = [
  ...seedPosts,
  ...batch1Posts,
  ...batch2Posts,
  ...batch3Posts,
  ...batch4Posts,
  ...batch5Posts,
  ...batch6Posts,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.slug);
}

export function getRelatedPosts(post: BlogPost, max = 3): BlogPost[] {
  const bySlug = post.relatedSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));
  if (bySlug.length >= max) return bySlug.slice(0, max);

  const fallback = allPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category && !bySlug.includes(p)
  );
  return [...bySlug, ...fallback].slice(0, max);
}
