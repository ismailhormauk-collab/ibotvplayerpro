"use client";
import { useState } from "react";
import { Eye, EyeOff, CircleAlert, CircleCheck, List, ShieldCheck, Globe } from "lucide-react";
import PosterBackground from "@/components/PosterBackground";
import { useLanguage } from "@/lib/i18n/context";

const WHATSAPP_NUMBER = "447882758472";

type FormState = "idle" | "success";

interface Fields { portalUrl: string; username: string; password: string }
interface FieldErrors { portalUrl?: string; username?: string; password?: string }

const FEATURE_ICONS = [List, ShieldCheck, Globe];

export default function ManagePlaylistsPage() {
  const { t } = useLanguage();
  const mp = t.managePlaylists;
  const fe = mp.form;
  const err = mp.errors;

  const [fields, setFields] = useState<Fields>({ portalUrl: "", username: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = (f: Fields): FieldErrors => {
    const e: FieldErrors = {};
    if (!f.portalUrl.trim()) {
      e.portalUrl = err.portalUrl;
    } else {
      try {
        new URL(f.portalUrl.startsWith("http") ? f.portalUrl : `http://${f.portalUrl}`);
      } catch {
        e.portalUrl = err.portalUrlInvalid;
      }
    }
    if (!f.username.trim())  e.username = err.username;
    if (!f.password.trim())  e.password = err.password;
    else if (f.password.length < 3) e.password = err.passwordMin;
    return e;
  };

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (touched[key]) setErrors(validate({ ...fields, [key]: e.target.value }));
  };

  const blur = (key: keyof Fields) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ portalUrl: true, username: true, password: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const message = [
      "📋 *New Manage Playlist Request*",
      "",
      `🌐 *Portal URL:* ${fields.portalUrl.trim()}`,
      `👤 *Username:* ${fields.username.trim()}`,
      `🔑 *Password:* ${fields.password.trim()}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setFormState("success");
  };

  const isSuccess = formState === "success";

  const inputCls = (key: keyof Fields) => {
    const t2 = !!touched[key];
    const e = errors[key];
    const base = "w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm outline-none transition-all duration-200";
    if (t2 && e)   return `${base} border-red-500/50 focus:border-red-500/70`;
    if (t2 && !e)  return `${base} border-[#E50914]/40 focus:border-[#E50914]/60`;
    return `${base} border-white/[0.07] focus:border-white/20 focus:bg-white/[0.06]`;
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <PosterBackground count={80} opacity="opacity-35" cols="grid-cols-6 sm:grid-cols-8 md:grid-cols-10" />

      <main className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 pt-20 sm:pb-16 sm:pt-28 lg:pt-32">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-24 items-center">

            {/* ── Left heading ── */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 border border-[#E50914]/70 text-[#E50914] text-[11px] font-bold px-3.5 py-1.5 rounded tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                {mp.badge}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight">
                {mp.heading1}
                <br />
                <span className="text-[#E50914]">{mp.heading2}</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed max-w-md">{mp.subtitle}</p>

              <div className="flex flex-wrap gap-5 pt-2">
                {mp.features.map((text, i) => {
                  const Icon = FEATURE_ICONS[i];
                  return (
                    <div key={text} className="flex items-center gap-2 text-gray-500 text-sm">
                      <Icon size={14} className="text-[#E50914]" />
                      {text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right card ── */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className="h-px bg-gradient-to-r from-transparent via-[#E50914]/40 to-transparent" />

                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{fe.title}</h2>
                    <p className="text-gray-500 text-sm">{fe.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    {/* Portal URL */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                        {fe.portalUrl} <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fields.portalUrl}
                        onChange={set("portalUrl")}
                        onBlur={blur("portalUrl")}
                        placeholder="e.g. http://portal.example.com:8080"
                        autoComplete="off"
                        spellCheck={false}
                        className={inputCls("portalUrl")}
                      />
                      {touched.portalUrl && errors.portalUrl && (
                        <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 mt-0.5">
                          <CircleAlert size={11} />{errors.portalUrl}
                        </p>
                      )}
                    </div>

                    {/* Username */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                        {fe.username} <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fields.username}
                        onChange={set("username")}
                        onBlur={blur("username")}
                        placeholder="Your username"
                        autoComplete="username"
                        spellCheck={false}
                        className={inputCls("username")}
                      />
                      {touched.username && errors.username && (
                        <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 mt-0.5">
                          <CircleAlert size={11} />{errors.username}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                        {fe.password} <span className="text-[#E50914]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={fields.password}
                          onChange={set("password")}
                          onBlur={blur("password")}
                          placeholder="Your password"
                          autoComplete="current-password"
                          className={`${inputCls("password")} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors duration-150"
                          aria-label={showPassword ? fe.hidePassword : fe.showPassword}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {touched.password && errors.password && (
                        <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 mt-0.5">
                          <CircleAlert size={11} />{errors.password}
                        </p>
                      )}
                    </div>

                    {/* Success banner */}
                    {isSuccess && (
                      <div className="flex items-start gap-2.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3.5">
                        <CircleCheck size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-400 text-sm font-semibold">{fe.successTitle}</p>
                          <p className="text-emerald-400/70 text-xs mt-0.5">{fe.successBody}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSuccess}
                      className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 mt-1 ${
                        isSuccess
                          ? "bg-[#1a1a1a] border border-white/[0.06] text-gray-600 cursor-not-allowed"
                          : "bg-[#E50914] hover:bg-[#CC0812] text-white shadow-[0_4px_24px_rgba(229,9,20,0.25)] hover:shadow-[0_4px_32px_rgba(229,9,20,0.4)] hover:-translate-y-px active:translate-y-0"
                      }`}
                    >
                      {isSuccess ? (
                        <span className="flex items-center justify-center gap-2">
                          <CircleCheck size={15} />{fe.submittedBtn}
                        </span>
                      ) : (
                        fe.submit
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-xs text-gray-600">
                    {fe.needHelp}{" "}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E50914]/80 hover:text-[#E50914] transition-colors duration-150 underline underline-offset-2"
                    >
                      {fe.chatWhatsApp}
                    </a>
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
