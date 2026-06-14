"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

export default function AppPreviewSection() {
  const { t } = useLanguage();
  const a = t.appPreview;

  return (
    <section id="preview" className="bg-white py-14 sm:py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 xl:gap-16 items-center">

          {/* LEFT — Product showcase */}
          <div className="flex justify-center items-center order-2 lg:order-1">
            <div className="relative w-full max-w-[680px] xl:max-w-[760px]">
              <div
                aria-hidden
                className="absolute inset-0 scale-[1.15] rounded-[40%_60%_55%_45%/40%_45%_55%_60%]
                  bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.22)_0%,rgba(229,9,20,0.08)_55%,transparent_80%)]
                  blur-2xl pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute inset-0 scale-[1.35]
                  bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.10)_0%,transparent_70%)]
                  blur-3xl pointer-events-none"
              />
              <div className="animate-float relative">
                <Image
                  src="/ibotv-app.jpg"
                  alt="iBoTV Player Pro — Live TV home screen on smart TV"
                  width={1280}
                  height={720}
                  className="relative w-full h-auto block object-contain"
                  loading="lazy"
                  quality={85}
                />
                <div aria-hidden className="absolute -bottom-3 left-[8%] right-[8%] h-5 bg-black/30 blur-md rounded-full pointer-events-none" />
                <div aria-hidden className="absolute -bottom-6 left-[14%] right-[14%] h-6 bg-black/[0.18] blur-xl rounded-full pointer-events-none" />
                <div aria-hidden className="absolute -bottom-10 left-[22%] right-[22%] h-8 bg-black/10 blur-2xl rounded-full pointer-events-none" />
              </div>
            </div>
          </div>

          {/* RIGHT — Copy */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="inline-flex w-fit items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/25 text-[#E50914] text-sm font-semibold px-4 py-1.5 rounded-full">
              {a.badge}
            </div>

            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
              {a.heading1}
              <br />
              {a.heading2}
            </h2>

            <div className="flex flex-col gap-3 text-gray-600 leading-relaxed">
              <p>{a.body1}</p>
              <p>{a.body2}</p>
            </div>

            <div className="w-10 h-0.5 bg-[#E50914]/40 rounded-full" />

            <div className="flex flex-wrap gap-2">
              {a.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5
                    bg-gray-50 border border-gray-200 text-gray-700
                    text-sm font-medium px-4 py-2 rounded-full
                    hover:bg-[#E50914]/5 hover:border-[#E50914]/30 hover:text-[#E50914]
                    transition-all duration-200 cursor-default select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]/60 flex-shrink-0" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
