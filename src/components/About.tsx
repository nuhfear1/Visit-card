"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .from(portraitRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.6")
      .from([block1Ref.current, block2Ref.current, block3Ref.current], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-[#161616] py-24 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center z-20 overflow-hidden font-jakarta"
    >
      <div 
        ref={logoRef}
        className="absolute top-6 left-8 z-20 text-[#F44A22] text-4xl tracking-widest pointer-events-none drop-shadow-md origin-center"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        ABOUT
      </div>

      <div className="max-w-6xl w-full mx-auto mt-8 flex flex-col">
        <div ref={titleRef} className="w-full relative select-none mb-8 md:mb-12 flex flex-col gap-3">
          <h1 className="font-oswald font-black text-[10vw] md:text-[11vw] uppercase leading-[0.8] text-[#F44A22] tracking-tighter">
            GARY
          </h1>
          <h1 className="font-oswald font-black text-[10vw] md:text-[11vw] uppercase leading-[0.8] text-[#F44A22] tracking-tighter">
            WILFRED-BORILLA
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div 
              ref={block1Ref} 
              className="bg-[#161616] text-[#FEF8E8] rounded-3xl p-8 md:p-10 border-4 border-[#161616] flex flex-col justify-between min-h-[320px] shadow-sm"
            >
              <div>
                <h2 className="font-oswald font-bold text-3xl md:text-4xl tracking-wide uppercase text-white mb-4">
                  DIGITAL STRATEGY &amp; GROWTH
                </h2>
                <p className="font-jakarta font-light text-base md:text-lg leading-relaxed text-[#E4E2E3]/95 max-w-2xl">
                  I connect strategy, acquisition, content and execution. From SEO and SEA to social ads, copywriting, emailing and web experiences, the goal is the same: build digital systems that attract attention, create trust and convert.
                </p>
              </div>

              <div 
                className="text-3xl md:text-4xl transform -rotate-3 select-none text-[#FEF8E8]/90 self-end mt-4 cursor-default"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Gary
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                ref={block2Ref} 
                className="bg-[#F44A22] text-[#FEF8E8] rounded-3xl p-8 border-4 border-[#161616] flex flex-col justify-between min-h-[220px] hover:shadow-[0_12px_30px_rgba(244,74,34,0.15)] transition-shadow duration-300"
              >
                <div>
                  <h3 className="font-oswald font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2 text-white">
                    THINK &amp; EXECUTE.
                  </h3>
                  <span className="font-jakarta font-medium text-xs tracking-wider opacity-90 uppercase">
                    BRIDGING STRATEGY &amp; EXECUTION
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs uppercase tracking-widest font-mono opacity-80">
                    Get in touch
                  </span>
                  <Link 
                    href="/contact" 
                    className="w-12 h-12 rounded-full bg-[#161616] hover:bg-[#FEF8E8] hover:text-[#161616] text-white flex items-center justify-center border-2 border-[#161616] transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div 
                ref={block3Ref} 
                className="bg-white text-[#161616] rounded-3xl p-8 border-4 border-[#161616] flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <h3 className="font-cormorant font-bold text-2xl md:text-3xl italic leading-tight text-[#161616] mb-3">
                    One system. Multiple levers.
                  </h3>
                  <p className="font-jakarta font-light text-sm text-gray-700 leading-relaxed">
                    SEO, paid acquisition, social media, copywriting, emailing and web execution can work as one coherent growth system instead of isolated services.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#F44A22] font-semibold mt-4">
                  <span>✦ GROWTH SYSTEM </span>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={portraitRef} 
            className="lg:col-span-5 relative w-full h-[450px] md:h-[500px] lg:h-auto rounded-3xl border-4 border-[#161616] overflow-hidden bg-gray-100 group order-1 lg:order-2"
          >
            <img 
              src="/profile-placeholder.svg" 
              alt="Gary WILFRED-BORILLA"
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out select-none pointer-events-auto"
            />

            <div className="absolute top-6 right-6 bg-[#7B2CBF] text-[#FEF8E8] font-bold text-[10px] md:text-xs uppercase px-4 py-1.5 rounded-full border-2 border-[#161616] select-none shadow-sm z-10">
              STRATEGY / EXECUTION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
