import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import PosterBackground from "@/components/PosterBackground";
import RichText from "@/components/blog/RichText";
import ArticleCTA from "@/components/blog/ArticleCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { CATEGORY_LABELS } from "@/lib/blog/types";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.seoTitle} | ${SITE_NAME} Blog`,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
    },
  };
}

function plainText(text: string): string {
  return text.replace(/\{\{link:[^|{}]+\|([^{}]+)\}\}/g, "$1");
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: plainText(post.h1),
    description: plainText(post.metaDescription),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.h1, item: url },
    ],
  };

  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: plainText(f.q),
          acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
        })),
      }
    : null;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <PosterBackground count={80} opacity="opacity-[0.18]" cols="grid-cols-6 sm:grid-cols-8 md:grid-cols-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="relative z-10 pt-24 sm:pt-36 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-600 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-gray-400 transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-gray-500 truncate">{post.h1}</span>
          </nav>

          <span className="inline-flex items-center bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {CATEGORY_LABELS[post.category]}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-5">
            {post.h1}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="relative z-10 pb-16 sm:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent" />
            <div className="p-6 sm:p-8 md:p-12">
              {/* Intro */}
              <div className="flex flex-col gap-4 mb-8">
                {post.intro.map((p, i) => (
                  <p key={i} className="text-gray-300 text-base leading-relaxed">
                    <RichText text={p} />
                  </p>
                ))}
              </div>

              {/* Sections */}
              <div className="flex flex-col gap-8">
                {post.sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-[#E50914] rounded-full flex-shrink-0" />
                      {section.heading}
                    </h2>
                    <div className="flex flex-col gap-3 pl-3">
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-gray-400 text-sm sm:text-base leading-relaxed">
                          <RichText text={p} />
                        </p>
                      ))}
                      {section.list && (
                        <ul className="flex flex-col gap-2 mt-1">
                          {section.list.map((item, k) => (
                            <li key={k} className="flex items-start gap-2 text-gray-400 text-sm sm:text-base leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] mt-2 flex-shrink-0" />
                              <span><RichText text={item} /></span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-10 pt-8 border-t border-white/[0.06]">
                  <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#E50914] rounded-full flex-shrink-0" />
                    Frequently Asked Questions
                  </h2>
                  <div className="flex flex-col gap-5">
                    {post.faqs.map((faq, i) => (
                      <div key={i}>
                        <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5">{faq.q}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          <RichText text={faq.a} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conclusion */}
              <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col gap-4">
                {post.conclusion.map((p, i) => (
                  <p key={i} className="text-gray-300 text-base leading-relaxed">
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </div>
          </div>

          <ArticleCTA />
          <RelatedArticles posts={related} />
        </div>
      </section>
    </div>
  );
}
