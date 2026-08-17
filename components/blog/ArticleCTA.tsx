import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function ArticleCTA() {
  return (
    <div className="mt-10 bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent" />
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Ready to start streaming?</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Check our{" "}
            <Link href="/#pricing" className="text-[#E50914] hover:text-[#ff2732] underline underline-offset-2">
              pricing plans
            </Link>
            , browse the{" "}
            <Link href="/faq" className="text-[#E50914] hover:text-[#ff2732] underline underline-offset-2">
              FAQ
            </Link>
            , or{" "}
            <Link href="/contact" className="text-[#E50914] hover:text-[#ff2732] underline underline-offset-2">
              contact our team
            </Link>{" "}
            — we typically reply within minutes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href="/#pricing"
            className="flex items-center justify-center gap-2 bg-[#E50914] hover:bg-[#CC0812] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors duration-200 whitespace-nowrap"
          >
            View Pricing
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-200 whitespace-nowrap"
          >
            <MessageCircle size={15} />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
