import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { CATEGORY_LABELS } from "@/lib/blog/types";

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="group bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-[#E50914]/30 transition-all duration-300 flex flex-col">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-flex items-center self-start bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          {CATEGORY_LABELS[post.category]}
        </span>
        <h3 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-[#E50914] transition-colors duration-200">
          <Link href={`/blog/${post.slug}`}>{post.h1}</Link>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 text-gray-600 text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-[#E50914] text-xs font-bold uppercase tracking-wider hover:gap-2 transition-all duration-200 whitespace-nowrap"
          >
            Read More
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
