"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import type { MouseEvent } from "react";
import { usePageTransition } from "@/components/PageTransition";
import { footerCopy } from "@/lib/footer-copy";
import { getFaqTerminology } from "@/lib/faq-terminology";
import { getCopy, getLocaleFromPathname, localizedPath } from "@/lib/i18n";

const normalizePath = (value: string) => value === "/" ? "/" : value.replace(/\/+$/, "");

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getCopy(locale).nav;
  const footer = footerCopy[locale];
  const faq = getFaqTerminology(locale);
  const { startTransition } = usePageTransition();
  const isRtl = locale === "ar";

  const links = [
    { label: copy.home, href: localizedPath(locale, "/") },
    { label: copy.services, href: localizedPath(locale, "/about") },
    { label: copy.projects, href: localizedPath(locale, "/projects") },
    { label: faq.navLabel, href: localizedPath(locale, "/faq") },
    { label: copy.contact, href: localizedPath(locale, "/contact") },
  ];

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (normalizePath(pathname) === normalizePath(href)) return;
    event.preventDefault();
    startTransition(href);
  };

  return (
    <footer className="relative overflow-hidden bg-[#161616] px-5 py-14 text-white sm:px-8 md:py-20 lg:px-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#F44A22]/20" />
      <div className="pointer-events-none absolute -bottom-52 left-1/3 h-[32rem] w-[32rem] rounded-full bg-[#F44A22]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)] lg:items-end lg:gap-16 lg:pb-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F44A22]">{footer.eyebrow}</p>
            <h2 className="mt-5 max-w-6xl font-oswald text-[12vw] font-black uppercase leading-[0.84] tracking-[-0.052em] sm:text-[8vw] lg:text-[5.2vw]">
              <span className="block">{footer.doctrine[0]}</span>
              <span className="mt-2 block text-[#F44A22]">{footer.doctrine[1]}</span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-sm leading-7 text-white/62 md:text-base">{footer.support}</p>
            <Link href={localizedPath(locale, "/contact")} onClick={(event) => navigate(event, localizedPath(locale, "/contact"))} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F44A22] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition hover:bg-white hover:text-[#161616] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]">
              {copy.contact}<ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="font-oswald text-2xl font-black uppercase tracking-tight">Gary WILFRED-BORILLA</div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Strategy · Acquisition · AI · Automation</div>
          </div>

          <nav aria-label={footer.navigation}>
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">{footer.navigation}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {links.map((item) => (
                <Link key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)} className="text-sm text-white/68 transition hover:text-[#F44A22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F44A22]">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">{footer.directContact}</p>
            <a href="mailto:garywilfredborilla@gmail.com" className="inline-flex items-center gap-2 break-all text-sm text-white/68 transition hover:text-[#F44A22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F44A22]" dir="ltr">
              <Mail size={15} />garywilfredborilla@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-[9px] font-bold uppercase tracking-[0.15em] text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Gary WILFRED-BORILLA</span>
          <span>{footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
