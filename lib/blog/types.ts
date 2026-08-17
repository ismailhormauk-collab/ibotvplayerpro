export type BlogCategory =
  | "encoders-hardware"
  | "providers-services"
  | "streaming-quality"
  | "regional-guides"
  | "industry-trends";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  /** Unique URL slug, e.g. "what-is-an-iptv-encoder" */
  slug: string;
  /** Primary target keyword for this article */
  keyword: string;
  category: BlogCategory;
  /** <title> tag content */
  seoTitle: string;
  /** meta description, ~150-160 chars */
  metaDescription: string;
  /** On-page H1 (can differ slightly from seoTitle) */
  h1: string;
  /** Short teaser shown on cards (~140-180 chars) */
  excerpt: string;
  /** ISO date string, e.g. "2026-06-01" */
  date: string;
  /** e.g. "6 min read" */
  readTime: string;
  /** Intro paragraphs before the first H2 */
  intro: string[];
  /** H2-level sections making up the body */
  sections: BlogSection[];
  faqs?: BlogFaq[];
  conclusion: string[];
  /** Slugs of 2-4 related posts */
  relatedSlugs: string[];
}

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "encoders-hardware": "Encoders & Hardware",
  "providers-services": "IPTV Providers & Services",
  "streaming-quality": "4K & Streaming Quality",
  "regional-guides": "Regional Guides",
  "industry-trends": "Industry Trends",
};
