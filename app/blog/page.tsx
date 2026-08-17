import type { Metadata } from "next";
import PosterBackground from "@/components/PosterBackground";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { getAllPosts } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — IPTV Guides, Encoders & Streaming Tips | ibo player pro",
  description:
    "Practical guides on IPTV encoders, providers, 4K streaming, and industry trends — written to help you understand and choose the right setup.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <PosterBackground count={80} opacity="opacity-[0.18]" cols="grid-cols-6 sm:grid-cols-8 md:grid-cols-10" />

      {/* Hero */}
      <section className="relative z-10 pt-24 sm:pt-36 pb-10 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5 sm:gap-6">
          <div
            className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse, #E50914 0%, transparent 70%)" }}
            aria-hidden
          />
          <div className="inline-flex items-center gap-2 border border-[#E50914]/60 text-[#E50914] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
            Blog
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">
            IPTV Guides &amp; <span className="text-[#E50914]">Streaming Insights</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-2xl">
            Practical, no-fluff articles on encoders, providers, 4K streaming, and where the IPTV industry is headed.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogIndexClient posts={posts} />
        </div>
      </section>
    </div>
  );
}
