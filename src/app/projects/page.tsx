"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ImageMaskGrid from "@/components/ui/image-mask";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(titleRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(gridRef.current, {
        scale: 0.98,
        opacity: 0,
        y: 20,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.4");
  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-palette-grey px-0 pb-16 pt-28 text-palette-midnight md:pb-20 md:pt-32"
    >
      <div
        ref={titleRef}
        className="pointer-events-none absolute left-6 top-6 z-20 text-3xl tracking-widest text-[#F44A22] drop-shadow-md md:left-8 md:text-4xl"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        PROJETS
      </div>

      <div ref={gridRef} className="relative z-10 w-full max-w-full">
        <ImageMaskGrid />
      </div>
    </main>
  );
}
