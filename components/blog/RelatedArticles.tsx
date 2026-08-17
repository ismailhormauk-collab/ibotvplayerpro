import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";

export default function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#E50914] rounded-full flex-shrink-0" />
        Related Articles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group bg-[#0f0f0f]/70 backdrop-blur-xl border border-white/[0.07] hover:border-[#E50914]/30 rounded-xl p-5 transition-all duration-200 flex flex-col"
          >
            <span className="text-white text-sm font-semibold leading-snug mb-3 group-hover:text-[#E50914] transition-colors duration-200">
              {p.h1}
            </span>
            <span className="mt-auto flex items-center gap-1 text-[#E50914] text-xs font-bold uppercase tracking-wider">
              Read
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
