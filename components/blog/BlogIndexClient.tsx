"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost, BlogCategory } from "@/lib/blog/types";
import { CATEGORY_LABELS } from "@/lib/blog/types";
import ArticleCard from "@/components/blog/ArticleCard";

const PAGE_SIZE = 9;

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "all">("all");
  const [page, setPage] = useState(1);

  const featured = posts[0];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of posts) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery =
        q === "" ||
        p.h1.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keyword.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  const showFeatured = query === "" && category === "all" && page === 1;
  const listPosts = showFeatured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  const totalPages = Math.max(1, Math.ceil(listPosts.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageStart = (clampedPage - 1) * PAGE_SIZE;
  const pagePosts = listPosts.slice(pageStart, pageStart + PAGE_SIZE);

  const setAndResetPage = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <>
      {/* Featured article */}
      {showFeatured && (
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-[#E50914] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
            Featured Article
          </span>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-5 gap-0 bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#E50914]/30 rounded-2xl overflow-hidden transition-all duration-300"
          >
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center">
              <span className="inline-flex items-center self-start bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                {CATEGORY_LABELS[featured.category]}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3 group-hover:text-[#E50914] transition-colors duration-200">
                {featured.h1}
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-2xl mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-gray-600 text-xs mb-2">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {featured.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[#E50914] text-sm font-bold uppercase tracking-wider mt-3 group-hover:gap-2 transition-all duration-200">
                Read Article
                <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Search + category filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="relative w-full md:max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setAndResetPage(() => setQuery(e.target.value))}
            placeholder="Search articles…"
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#E50914]/40 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAndResetPage(() => setCategory("all"))}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              category === "all"
                ? "bg-[#E50914] text-white"
                : "bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.09]"
            }`}
          >
            All ({posts.length})
          </button>
          {(Object.keys(CATEGORY_LABELS) as BlogCategory[]).map((c) => (
            <button
              key={c}
              onClick={() => setAndResetPage(() => setCategory(c))}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                category === c
                  ? "bg-[#E50914] text-white"
                  : "bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.09]"
              }`}
            >
              {CATEGORY_LABELS[c]} ({categoryCounts[c] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {pagePosts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagePosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No articles match your search.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.09] disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                n === clampedPage
                  ? "bg-[#E50914] text-white"
                  : "bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.09]"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.09] disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
