"use client";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export default function PricingSection() {
  const { t } = useLanguage();
  const p = t.pricing;
  const bestValueIndex = p.plans.length - 1;

  return (
    <section id="pricing" className="bg-gray-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{p.heading}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{p.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.plans.map(({ name, duration, price }, i) => {
            const featured = i === bestValueIndex;
            return (
              <div
                key={name}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 ${
                  featured
                    ? "bg-[#0a0a0a] border-2 border-[#E50914] shadow-xl sm:scale-105"
                    : "bg-white border border-gray-200 hover:border-[#E50914]/30 hover:shadow-lg"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E50914] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                    {p.badge}
                  </span>
                )}

                <h3 className={`text-lg font-bold mb-1 ${featured ? "text-white" : "text-gray-900"}`}>
                  {name}
                </h3>
                <p className={`text-sm mb-6 ${featured ? "text-gray-400" : "text-gray-500"}`}>
                  {duration}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-black ${featured ? "text-white" : "text-gray-900"}`}>
                    {price}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={16} className="text-[#E50914] flex-shrink-0 mt-0.5" />
                      <span className={`text-sm leading-snug ${featured ? "text-gray-300" : "text-gray-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center font-semibold px-6 py-3 rounded-xl transition-colors duration-200 ${
                    featured
                      ? "bg-[#E50914] hover:bg-[#CC0812] text-white"
                      : "bg-gray-100 hover:bg-[#E50914] hover:text-white text-gray-900"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
