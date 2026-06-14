"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";

export default function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const NAV_LINKS = [
    { label: t.nav.home,            href: "/"                 },
    { label: t.nav.managePlaylists, href: "/manage-playlists" },
    { label: t.nav.activate,        href: "/activate"         },
    { label: t.nav.faq,             href: "/faq"              },
    { label: t.nav.contact,         href: "/contact"          },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkCls = (href: string, mobile = false) => {
    const active = isActive(href);
    return mobile
      ? `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] ${
          active
            ? "bg-[#E50914] text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`
      : `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          active
            ? "bg-[#E50914] text-white"
            : "text-gray-400 hover:text-white"
        }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0a0a]/90 backdrop-blur-md border-b ${
        scrolled || menuOpen
          ? "border-white/10 shadow-xl"
          : "border-white/[0.04]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center text-white font-black text-sm select-none">
              IP
            </div>
            <span className="text-base font-bold">
              <span className="text-[#E50914]">ibo</span>
              <span className="text-white"> player pro</span>
            </span>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={linkCls(href)}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="lg:hidden text-white p-2 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav
          className="bg-[#0a0a0a]/98 backdrop-blur-md border-t border-gray-800 px-4 py-4 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className={linkCls(href, true)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
