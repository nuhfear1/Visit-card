"use client";

import React, { useEffect, useState } from "react";
import { Home, SlidersHorizontal, BadgeCheck, MessageCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition";

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

  const navItems = [
    { icon: <Home size={18} />, label: "Accueil", mobileLabel: "Accueil", description: "Partir du problème", href: "/" },
    { icon: <SlidersHorizontal size={18} />, label: "Services", mobileLabel: "Services", description: "Choisir le bon levier", href: "/about" },
    { icon: <BadgeCheck size={18} />, label: "Projets", mobileLabel: "Projets", description: "Voir les preuves", href: "/projects" },
    { icon: <MessageCircle size={18} />, label: "Parler du projet", mobileLabel: "Parler du projet", description: "Me dire ce qui bloque", href: "/contact", cta: true },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);
    if (pathname !== href) startTransition(href);
  };

  return (
    <>
      <GlassFilter />

      <div className="fixed top-6 left-1/2 z-50 hidden -translate-x-1/2 md:block">
        <GlassEffect className="rounded-full p-1.5 hover:p-2 hover:rounded-full transition-all duration-500">
          <div className="flex items-center justify-center gap-2 rounded-full p-1 overflow-hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isCta = item.cta;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => navigate(event, item.href)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer group ${
                    isCta
                      ? "bg-[#F44A22] text-white shadow-[0_5px_18px_rgba(244,74,34,.18)] hover:bg-[#161616]"
                      : isActive
                        ? "bg-[#161616] text-white"
                        : "bg-white/10 text-palette-stone hover:bg-[#161616] hover:text-white"
                  }`}
                  style={{ transformOrigin: "center center", transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)" }}
                >
                  {item.icon}
                  <span className="ml-2 text-sm font-medium tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </GlassEffect>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className={`fixed right-5 top-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-[#161616]/20 backdrop-blur-xl transition-all duration-300 md:hidden ${isOpen ? "bg-[#161616] text-white" : "bg-white/70 text-[#161616] shadow-[0_8px_30px_rgba(0,0,0,.12)]"}`}
      >
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[70] overflow-hidden bg-[#E4E2E3]/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#F44A22]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#7B2CBF]/10 blur-3xl" />

        <div className="relative flex h-full flex-col px-6 pb-8 pt-24">
          <div className="mb-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F44A22]">OÙ EN ÊTES-VOUS ?</div>
            <p className="mt-2 max-w-xs text-xs leading-5 text-[#161616]/55">Comprendre. Choisir. Vérifier. Puis parler du projet.</p>
          </div>

          <nav className="flex flex-1 flex-col justify-center" aria-label="Navigation mobile">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const isCta = item.cta;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => navigate(event, item.href)}
                  tabIndex={isOpen ? 0 : -1}
                  className={`group flex items-center justify-between border-t border-[#161616]/15 py-5 transition-all duration-300 ${
                    isCta ? "text-[#F44A22]" : isActive ? "text-[#F44A22]" : "text-[#161616]"
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="mt-1 text-[10px] font-bold tracking-[0.2em] text-[#161616]/35">0{index + 1}</span>
                    <div className="min-w-0">
                      <span className={`block font-oswald font-black uppercase leading-none tracking-tight ${isCta ? "text-[10vw]" : "text-[11vw]"}`}>{item.mobileLabel}</span>
                      <span className={`mt-2 block text-[10px] font-bold uppercase tracking-[0.16em] ${isCta ? "text-[#F44A22]/70" : "text-[#161616]/45"}`}>{item.description}</span>
                    </div>
                  </div>
                  <span className={`ml-3 text-2xl transition-transform duration-300 group-active:translate-x-1 ${isActive ? "rotate-45" : ""}`}>↗</span>
                </Link>
              );
            })}
            <div className="border-t border-[#161616]/15" />
          </nav>

          <div className="flex items-center gap-2 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#161616]/50">
            <span className="h-2 w-2 rounded-full bg-[#F44A22]" />
            Disponible pour de nouveaux projets
          </div>
        </div>
      </div>
    </>
  );
}
