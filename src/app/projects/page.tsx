"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ImageMaskGrid from "@/components/ui/image-mask";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(logoRef.current, {
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
      className="relative w-full min-h-screen bg-palette-grey text-palette-midnight flex flex-col justify-center items-center py-24 px-0 overflow-hidden"
    >
      <div
        ref={logoRef}
        className="absolute top-6 left-8 z-20 text-[#F44A22] text-4xl tracking-widest pointer-events-none drop-shadow-md origin-center"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        EXPERTISE
      </div>

      <div ref={gridRef} className="w-full max-w-full z-10">
        <ImageMaskGrid />
      </div>
    </main>
  );
}
