"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ImageMaskGrid from "@/components/ui/image-mask";
import TrustRails from "@/components/TrustRails";
import { getCopy, type Locale } from "@/lib/i18n";

export default function ProjectsView({ locale = "fr" }: { locale?: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const copy = getCopy(locale).projectsPage;

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(titleRef.current, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(gridRef.current, { scale: 0.98, opacity: 0, y: 20, duration: 1.0, ease: "power3.out" }, "-=0.4");
  }, { scope: containerRef });

  return (
    <main ref={containerRef} dir={locale === "ar" ? "rtl" : "ltr"} className="relative min-h-screen w-full overflow-hidden bg-palette-grey px-0 pb-16 pt-28 text-palette-midnight md:pb-20 md:pt-32">
      <div ref={titleRef} className="relative z-20 mb-10 px-6 md:mb-14 md:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F44A22] md:text-sm" style={{ fontFamily: "'Oswald', sans-serif" }}>
          {copy.eyebrow}
        </div>
        <h1 className="mt-4 max-w-6xl font-oswald text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
          {copy.headline}
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#161616]/70 md:text-base lg:text-lg">{copy.intro}</p>
      </div>

      <div ref={gridRef} className="relative z-10 w-full max-w-full">
        <ImageMaskGrid locale={locale} />
      </div>

      <div className="relative z-10 mt-14 md:mt-20">
        <TrustRails locale={locale} variant="projects" />
      </div>
    </main>
  );
}
