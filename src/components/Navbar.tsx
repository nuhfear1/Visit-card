"use client";

import React, { useEffect, useRef, useState } from "react";
import { Home, SlidersHorizontal, BadgeCheck, CircleHelp, MessageCircle, Menu, X, Languages, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition";
import { getCopy, getLocaleFromPathname, localizedPath, localeOptions, stripLocaleFromPathname } from "@/lib/i18n";
import { getFaqCopy } from "@/lib/faq";
import { getFaqTerminology } from "@/lib/faq-terminology";

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

const GlassEffect: React.FC<GlassEffectProps> = ({ children, className = "", style = {}, href, target = "_blank" }) => {
  const glassStyle = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div className={`relative flex font-semibold overflow-hidden text-black cursor-pointer transition-all duration-700 ${className}`} style={glassStyle}>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-inherit rounded-3xl" style={{ backdropFilter: "blur(3px)", filter: "url(#glass-distortion)", isolation: "isolate" }} />
      <div className="absolute inset-0 z-10 rounded-inherit" style={{ background: "rgba(255, 255, 255, 0.25)" }} />
      <div className="absolute inset-0 z-20 rounded-inherit rounded-3xl overflow-hidden" style={{ boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)" }} />
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? <a href={href} target={target} rel="noopener noreferrer" className="block">{content}</a> : content;
};

const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
      <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const { startTransition } = usePageTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const locale = getLocaleFromPathname(pathname);
  const copy = getCopy(locale).nav;
  const faqCopy = getFaqCopy(locale);
  const faqTerminology = getFaqTerminology(locale);
  const basePath = stripLocaleFromPathname(pathname);

  const usesCompactDesktopNav = ["fr", "en", "es", "pt", "ja"].includes(locale);
  const desktopVisibility = usesCompactDesktopNav ? "hidden lg:block" : "hidden md:block";
  const mobileVisibility = usesCompactDesktopNav ? "lg:hidden" : "md:hidden";

  const navItems = [
    { icon: <Home size={18} />, label: copy.home, description: copy.homeDesc, href: localizedPath(locale, "/") },
    { icon: <SlidersHorizontal size={18} />, label: copy.services, description: copy.servicesDesc, href: localizedPath(locale, "/about") },
    { icon: <BadgeCheck size={18} />, label: copy.projects, description: copy.projectsDesc, href: localizedPath(locale, "/projects") },
    { icon: <CircleHelp size={18} />, label: faqTerminology.navLabel, description: faqCopy.navDesc, href: localizedPath(locale, "/faq") },
    { icon: <MessageCircle size={18} />, label: copy.contact, description: copy.contactDesc, href: localizedPath(locale, "/contact"), cta: true },
  ];

  useEffect(() => {
    setIsOpen(false);
    setLanguageOpen(false);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale === "es" ? "es-419" : locale === "pt" ? "pt-BR" : locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : locale === "ko" ? "ko-KR" : locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [pathname, locale]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (languageOpen && languageRef.current && !languageRef.current.contains(event.target as Node)) setLanguageOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [languageOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);
    setLanguageOpen(false);
    if (pathname !== href) startTransition(href);
  };

  const currentLanguage = localeOptions.find((item) => item.code === locale)?.label || "Français";

  return (
    <>
      <GlassFilter />

      <div className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 ${desktopVisibility}`} dir="ltr">
        <div className={`flex items-start ${usesCompactDesktopNav ? "gap-1.5" : "gap-2"}`}>
          <GlassEffect className={`rounded-full transition-all duration-500 hover:rounded-full ${usesCompactDesktopNav ? "p-1 hover:p-1.5" : "p-1.5 hover:p-2"}`}>
            <div className={`flex items-center justify-center rounded-full p-1 overflow-hidden ${usesCompactDesktopNav ? "gap-1" : "gap-2"}`}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isCta = item.cta;
                return (
                  <Link key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)} className={`group flex shrink-0 items-center whitespace-nowrap rounded-full transition-all duration-500 hover:scale-105 cursor-pointer ${usesCompactDesktopNav ? "px-3 py-2" : "px-4 py-2"} ${isCta ? "bg-[#F44A22] text-white shadow-[0_5px_18px_rgba(244,74,34,.18)] hover:bg-[#161616]" : isActive ? "bg-[#161616] text-white" : "bg-white/10 text-palette-stone hover:bg-[#161616] hover:text-white"}`} style={{ transformOrigin: "center center", transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)" }}>
                    {item.icon}
                    <span className={`ml-2 font-medium ${usesCompactDesktopNav ? "text-[13px] tracking-[0.02em]" : "text-sm tracking-wide"}`}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </GlassEffect>

          <div ref={languageRef} className="relative shrink-0">
            <button type="button" onClick={() => setLanguageOpen((open) => !open)} aria-expanded={languageOpen} aria-haspopup="listbox" aria-label={copy.language} className={`flex items-center rounded-full border border-white/35 bg-white/55 font-semibold text-[#161616] shadow-[0_6px_20px_rgba(0,0,0,.12)] backdrop-blur-xl transition hover:bg-white/75 ${usesCompactDesktopNav ? "h-[48px] gap-1.5 px-3 text-[11px]" : "h-[52px] gap-2 px-4 text-xs"}`}>
              <Languages size={usesCompactDesktopNav ? 16 : 17} />
              <span className="whitespace-nowrap">{currentLanguage}</span>
              <ChevronDown size={14} className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
            </button>
            {languageOpen && (
              <div role="listbox" className="absolute right-0 top-[60px] max-h-[min(420px,calc(100vh-96px))] w-52 overflow-y-auto overscroll-contain rounded-2xl border border-[#161616]/10 bg-white/95 p-2 shadow-2xl backdrop-blur-xl">
                {localeOptions.map((option) => {
                  const href = localizedPath(option.code, basePath);
                  return <Link key={option.code} href={href} onClick={(event) => navigate(event, href)} role="option" aria-selected={option.code === locale} className={`block rounded-xl px-3 py-2.5 text-sm transition ${option.code === locale ? "bg-[#F44A22] text-white" : "hover:bg-[#161616]/5"}`}>{option.label}</Link>;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isOpen} aria-controls="mobile-navigation" className={`fixed right-5 top-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-[#161616]/20 backdrop-blur-xl transition-all duration-300 ${mobileVisibility} ${isOpen ? "bg-[#161616] text-white" : "bg-white/70 text-[#161616] shadow-[0_8px_30px_rgba(0,0,0,.12)]"}`}>
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <div id="mobile-navigation" aria-hidden={!isOpen} className={`fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-[#E4E2E3]/95 backdrop-blur-2xl transition-all duration-500 ${mobileVisibility} ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="pointer-events-none fixed -left-24 top-28 h-72 w-72 rounded-full bg-[#F44A22]/15 blur-3xl" />
        <div className="pointer-events-none fixed -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#7B2CBF]/10 blur-3xl" />
        <div className="relative flex min-h-full flex-col px-5 pb-7 pt-24 sm:px-6" dir={locale === "ar" ? "rtl" : "ltr"}>
          <div className="mb-5 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F44A22]">{copy.mobileEyebrow}</div>
            <p className="mt-2 max-w-xs text-xs leading-5 text-[#161616]/55">{copy.mobileIntro}</p>
          </div>
          <nav className="flex flex-col justify-center" aria-label="Navigation mobile">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const isCta = item.cta;
              return (
                <Link key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)} tabIndex={isOpen ? 0 : -1} className={`group flex items-center justify-between border-t border-[#161616]/15 py-4 transition-all duration-300 ${isCta || isActive ? "text-[#F44A22]" : "text-[#161616]"}`}>
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <span className="mt-1 shrink-0 text-[10px] font-bold tracking-[0.2em] text-[#161616]/35">0{index + 1}</span>
                    <div className="min-w-0">
                      <span className={`block break-words font-oswald font-black uppercase leading-[0.95] tracking-tight ${isCta ? "text-[8vw] sm:text-[8.5vw]" : "text-[9vw] sm:text-[10vw]"}`}>{item.label}</span>
                      <span className={`mt-1.5 block text-[9px] font-bold uppercase tracking-[0.1em] ${isCta ? "text-[#F44A22]/70" : "text-[#161616]/45"}`}>{item.description}</span>
                    </div>
                  </div>
                  <span className={`ml-3 shrink-0 text-2xl transition-transform duration-300 group-active:translate-x-1 ${isActive ? "rotate-45" : ""}`}>↗</span>
                </Link>
              );
            })}
            <div className="border-t border-[#161616]/15" />
          </nav>
          <div className="mt-5 shrink-0">
            <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#161616]/45"><Languages size={14} />{copy.language}</div>
            <div className="flex flex-wrap gap-2" dir="ltr">
              {localeOptions.map((option) => {
                const href = localizedPath(option.code, basePath);
                return <Link key={option.code} href={href} onClick={(event) => navigate(event, href)} tabIndex={isOpen ? 0 : -1} className={`rounded-full border px-3 py-2 text-[10px] font-semibold transition ${option.code === locale ? "border-[#F44A22] bg-[#F44A22] text-white" : "border-[#161616]/15 bg-white/35 text-[#161616]/65"}`}>{option.label}</Link>;
              })}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#161616]/50">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#F44A22]" />
            {copy.available}
          </div>
        </div>
      </div>
    </>
  );
}
