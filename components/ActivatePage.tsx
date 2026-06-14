"use client";
import { useState, useRef } from "react";
import {
  Eye, EyeOff, CircleAlert, CircleCheck,
  Zap, ShieldCheck, Clock, ChevronDown,
  Tv, Smartphone, Monitor, Wifi,
} from "lucide-react";
import PosterBackground from "@/components/PosterBackground";
import { useLanguage } from "@/lib/i18n/context";

const WHATSAPP = "447882758472";

interface Fields { fullName: string; email: string; deviceType: string; macAddress: string; activationCode: string }
interface Errors { fullName?: string; email?: string; deviceType?: string; macAddress?: string; activationCode?: string }

const TRUST_VALUES = [
  { value: "5 min" },
  { value: "24/7"  },
  { value: "4K"    },
  { value: "1000+" },
];

const STEP_ICONS = [Tv, ShieldCheck, Zap];
const FEATURE_ICONS = [Clock, ShieldCheck, Wifi, Smartphone, Monitor];

export default function ActivatePage() {
  const { t } = useLanguage();
  const a = t.activate;
  const fe = a.form;
  const err = a.errors;

  const formRef = useRef<HTMLDivElement>(null);

  const [fields, setFields] = useState<Fields>({
    fullName: "", email: "", deviceType: "", macAddress: "", activationCode: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [errors, setErrors]   = useState<Errors>({});
  const [showCode, setShowCode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (f: Fields): Errors => {
    const e: Errors = {};
    if (!f.fullName.trim())       e.fullName = err.fullName;
    if (!f.email.trim())          e.email    = err.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = err.emailInvalid;
    if (!f.deviceType)            e.deviceType = err.deviceType;
    if (!f.macAddress.trim())     e.macAddress = err.macAddress;
    if (!f.activationCode.trim()) e.activationCode = err.activationCode;
    return e;
  };

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const val = e.target.value;
    setFields((p) => ({ ...p, [key]: val }));
    if (touched[key]) setErrors(validate({ ...fields, [key]: val }));
  };

  const blur = (key: keyof Fields) => () => {
    setTouched((p) => ({ ...p, [key]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(fields) as (keyof Fields)[]).map((k) => [k, true])
    ) as Record<keyof Fields, boolean>;
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const msg = [
      "🚀 *New IPTV Activation Request*",
      "",
      `👤 *Full Name:* ${fields.fullName.trim()}`,
      `📧 *Email:* ${fields.email.trim()}`,
      `📺 *Device Type:* ${fields.deviceType}`,
      `🔢 *MAC / Device ID:* ${fields.macAddress.trim()}`,
      `🔑 *Activation Code:* ${fields.activationCode.trim()}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  };

  const inputClass = (t2: boolean, error?: string) => {
    const base = "w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm outline-none transition-all duration-200";
    if (t2 && error)   return `${base} border-red-500/50 focus:border-red-500/70`;
    if (t2 && !error)  return `${base} border-[#E50914]/40 focus:border-[#E50914]/60`;
    return `${base} border-white/[0.07] focus:border-white/25 focus:bg-white/[0.06]`;
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <PosterBackground opacity="opacity-[0.28]" />

      {/* ═══ HERO ═══ */}
      <section className="relative z-10 min-h-[92vh] flex items-center pt-16">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #E50914 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-8">

            <div className="inline-flex items-center gap-2 border border-[#E50914]/60 text-[#E50914] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
              {a.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              {a.heading1}
              <br />
              <span className="text-[#E50914]">{a.heading2}</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-xl">{a.subtitle}</p>

            <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 pt-2">
              {TRUST_VALUES.map(({ value }, i) => (
                <div key={value} className="flex flex-col items-center">
                  <span className="text-2xl font-black text-[#E50914]">{value}</span>
                  <span className="text-gray-500 text-xs tracking-wide uppercase mt-0.5">{a.trust[i].label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToForm}
              className="mt-2 inline-flex items-center gap-2.5 bg-[#E50914] hover:bg-[#CC0812] text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-[0.15em] shadow-[0_4px_32px_rgba(229,9,20,0.35)] hover:shadow-[0_4px_48px_rgba(229,9,20,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Zap size={16} />
              {a.ctaBtn}
            </button>

            <div className="flex flex-col items-center gap-1 mt-4 text-gray-600 text-xs animate-bounce">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-[#E50914] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              <span className="h-px w-8 bg-[#E50914]/60" />
              {a.hiw.badge}
              <span className="h-px w-8 bg-[#E50914]/60" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">{a.hiw.heading}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{a.hiw.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div
              className="hidden sm:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(229,9,20,0.4), transparent)" }}
              aria-hidden
            />
            {a.hiw.steps.map(({ title, desc }, i) => {
              const Icon = STEP_ICONS[i];
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={num}
                  className="group relative bg-[#0f0f0f]/70 backdrop-blur-xl border border-white/[0.08] hover:border-[#E50914]/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(229,9,20,0.1)] cursor-default"
                >
                  <span className="absolute top-5 right-6 text-5xl font-black text-white/[0.04] group-hover:text-[#E50914]/10 transition-colors duration-300 select-none">
                    {num}
                  </span>
                  <div className="w-12 h-12 bg-[#E50914]/10 border border-[#E50914]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E50914]/20 transition-colors duration-300">
                    <Icon size={22} className="text-[#E50914]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FORM ═══ */}
      <section className="relative z-10 py-16 sm:py-24 pb-16 sm:pb-32" ref={formRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 xl:gap-20 items-start">

            {/* Left copy */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-32">
              <div className="inline-flex w-fit items-center gap-2 border border-[#E50914]/60 text-[#E50914] text-[11px] font-bold px-3.5 py-1.5 rounded tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                {fe.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {fe.heading1}
                <br />
                <span className="text-[#E50914]">{fe.heading2}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">{fe.body}</p>
              <ul className="flex flex-col gap-3 mt-2">
                {fe.features.map((text, i) => {
                  const Icon = FEATURE_ICONS[i];
                  return (
                    <li key={text} className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="w-7 h-7 rounded-lg bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={13} className="text-[#E50914]" />
                      </span>
                      {text}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right form card */}
            <div className="lg:col-span-3">
              <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent" />
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{fe.title}</h3>
                    <p className="text-gray-500 text-sm">{fe.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    {/* Row 1: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                          {fe.fullName} <span className="text-[#E50914]">*</span>
                        </label>
                        <input
                          type="text"
                          value={fields.fullName}
                          onChange={set("fullName")}
                          onBlur={blur("fullName")}
                          placeholder="John Smith"
                          autoComplete="name"
                          spellCheck={false}
                          className={inputClass(!!touched.fullName, errors.fullName)}
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="text-red-400/80 text-[11px] flex items-center gap-1.5">
                            <CircleAlert size={11} />{errors.fullName}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                          {fe.email} <span className="text-[#E50914]">*</span>
                        </label>
                        <input
                          type="email"
                          value={fields.email}
                          onChange={set("email")}
                          onBlur={blur("email")}
                          placeholder="john@example.com"
                          autoComplete="email"
                          className={inputClass(!!touched.email, errors.email)}
                        />
                        {touched.email && errors.email && (
                          <p className="text-red-400/80 text-[11px] flex items-center gap-1.5">
                            <CircleAlert size={11} />{errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Device + MAC */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                          {fe.deviceType} <span className="text-[#E50914]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={fields.deviceType}
                            onChange={set("deviceType")}
                            onBlur={blur("deviceType")}
                            className={`${inputClass(!!touched.deviceType, errors.deviceType)} appearance-none pr-10 cursor-pointer`}
                            style={{ colorScheme: "dark" }}
                          >
                            <option value="" disabled className="bg-[#1a1a1a] text-gray-500">
                              {fe.selectDevice}
                            </option>
                            {fe.deviceTypes.map((d) => (
                              <option key={d} value={d} className="bg-[#1a1a1a] text-white">{d}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                        {touched.deviceType && errors.deviceType && (
                          <p className="text-red-400/80 text-[11px] flex items-center gap-1.5">
                            <CircleAlert size={11} />{errors.deviceType}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                          {fe.macAddress} <span className="text-[#E50914]">*</span>
                        </label>
                        <input
                          type="text"
                          value={fields.macAddress}
                          onChange={set("macAddress")}
                          onBlur={blur("macAddress")}
                          placeholder="e.g. 00:11:22:33:44:55"
                          autoComplete="off"
                          spellCheck={false}
                          className={`${inputClass(!!touched.macAddress, errors.macAddress)} font-mono tracking-wider`}
                        />
                        {touched.macAddress && errors.macAddress && (
                          <p className="text-red-400/80 text-[11px] flex items-center gap-1.5">
                            <CircleAlert size={11} />{errors.macAddress}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Activation Code */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                        {fe.activationCode} <span className="text-[#E50914]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCode ? "text" : "password"}
                          value={fields.activationCode}
                          onChange={set("activationCode")}
                          onBlur={blur("activationCode")}
                          placeholder="e.g. ORD-2024-XXXXX"
                          autoComplete="off"
                          className={`${inputClass(!!touched.activationCode, errors.activationCode)} pr-12`}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowCode(!showCode)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                          aria-label={showCode ? fe.hideCode : fe.showCode}
                        >
                          {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {touched.activationCode && errors.activationCode && (
                        <p className="text-red-400/80 text-[11px] flex items-center gap-1.5">
                          <CircleAlert size={11} />{errors.activationCode}
                        </p>
                      )}
                    </div>

                    {/* Success banner */}
                    {submitted && (
                      <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-4">
                        <CircleCheck size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-400 font-semibold text-sm">{fe.successTitle}</p>
                          <p className="text-emerald-400/70 text-xs mt-1 leading-relaxed">{fe.successBody}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitted}
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.18em] text-sm transition-all duration-300 mt-2 flex items-center justify-center gap-2.5 ${
                        submitted
                          ? "bg-[#1a1a1a] border border-white/[0.06] text-gray-600 cursor-not-allowed"
                          : "bg-[#E50914] hover:bg-[#CC0812] text-white shadow-[0_4px_32px_rgba(229,9,20,0.3)] hover:shadow-[0_4px_48px_rgba(229,9,20,0.45)] hover:-translate-y-0.5 active:translate-y-0"
                      }`}
                    >
                      {submitted ? (
                        <><CircleCheck size={16} />{fe.submittedBtn}</>
                      ) : (
                        <><Zap size={16} />{fe.submit}</>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-600 leading-relaxed">
                      {fe.termsNote}{" "}
                      <a href="/terms" className="text-[#E50914]/70 hover:text-[#E50914] underline underline-offset-2 transition-colors">
                        {fe.termsLink}
                      </a>
                      {fe.termsNote2}
                    </p>
                  </form>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {fe.trustBadges.map((text, i) => {
                  const Icon = [ShieldCheck, Clock, Wifi][i];
                  return (
                    <div key={text} className="flex items-center gap-2 text-gray-600 text-xs">
                      <Icon size={13} className="text-[#E50914]/60" />
                      {text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
