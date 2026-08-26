"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail, Phone, MessageCircle, type LucideIcon } from "lucide-react";
import { getCopy, type Locale } from "@/lib/i18n";
import useReducedMotion from "@/hooks/useReducedMotion";

type ContactLink = {
  label: string;
  value: string;
  mark: string;
  icon: LucideIcon;
  href?: string;
};

export default function Contact({ locale = "fr" }: { locale?: Locale }) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const copy = getCopy(locale).contactPage;
  const isRtl = locale === "ar";
  const reducedMotion = useReducedMotion();

  const links: ContactLink[] = [
    { label: copy.email, value: "garywilfredborilla@gmail.com", mark: "@", icon: Mail, href: "mailto:garywilfredborilla@gmail.com" },
    { label: copy.phone, value: "+590 690 09 63 77", mark: "TEL", icon: Phone, href: "tel:+590690096377" },
    { label: copy.whatsapp, value: "+590 690 09 63 77", mark: "WA", icon: MessageCircle, href: "https://wa.me/590690096377" },
  ];

  useGSAP(() => {
    if (reducedMotion) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(titleRef.current, { y: 35, opacity: 0, duration: 0.9, ease: "power3.out" })
      .from(cardsRef.current, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }, "-=0.45");
  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section ref={containerRef} dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen overflow-hidden bg-[#E4E2E3] px-6 pb-20 pt-28 text-[#161616] md:px-12 lg:px-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#F44A22]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#7B2CBF]/10 blur-3xl" />

      <div className="mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-between gap-16">
        <div ref={titleRef}>
          <div className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#F44A22]">{copy.eyebrow}</div>
          <h1 className="max-w-5xl font-oswald text-[13vw] font-black uppercase leading-[0.78] tracking-tighter md:text-[10vw]">
            {copy.headline[0]}
            <span className="block text-stroke-orange">{copy.headline[1]}</span>
          </h1>
          <p className="mt-8 max-w-2xl font-jakarta text-sm leading-7 text-[#161616]/65 md:text-base">{copy.intro}</p>
        </div>

        <div ref={cardsRef} className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {links.map(({ label, value, mark, icon: Icon, href }) => {
            const body = (
              <>
                <div className="flex items-start justify-between">
                  {Icon ? <Icon className="h-5 w-5 text-[#F44A22]" /> : <span className="flex h-6 min-w-6 items-center justify-center rounded-md border border-[#F44A22]/40 px-1 text-[10px] font-black uppercase tracking-tight text-[#F44A22]">{mark}</span>}
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#161616]/45">{label}</div>
                  <div dir="ltr" className="mt-2 break-words font-oswald text-xl font-bold tracking-wide">{value}</div>
                </div>
              </>
            );

            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group flex min-h-52 flex-col justify-between rounded-[2rem] border-2 border-[#161616] bg-white/55 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[#F44A22] hover:text-white">
                {body}
              </a>
            ) : (
              <div key={label} className="group flex min-h-52 flex-col justify-between rounded-[2rem] border-2 border-[#161616] bg-white/55 p-6 backdrop-blur-xl">{body}</div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl items-center justify-between border-t border-[#161616]/20 pt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#161616]/50">
        <span>Gary WILFRED-BORILLA</span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
