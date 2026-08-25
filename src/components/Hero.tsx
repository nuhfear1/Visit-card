"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePageTransition } from "@/components/PageTransition";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { startTransition } = usePageTransition();

  const phrases = useMemo(() => [
    "STRATÉGIE & CROISSANCE",
    "AGENTS IA & AUTOMATISATION",
    "WEB & EXPÉRIENCES DIGITALES",
    "MARKETING DIGITAL & COMMUNICATION",
  ], []);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = deleting ? 35 : 70;
    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === current) {
          window.setTimeout(() => setDeleting(true), 1300);
        }
      } else {
        const next = current.slice(0, Math.max(0, displayText.length - 1));
        setDisplayText(next);
        if (!next) {
          setDeleting(false);
          setPhraseIndex((index) => (index + 1) % phrases.length);
        }
      }
    }, speed);
    return () => window.clearTimeout(timer);
  }, [displayText, deleting, phraseIndex, phrases]);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(logoRef.current, { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" })
      .from(contentRef.current, { opacity: 0, scale: 0.98, duration: 1, ease: "power3.out" }, "-=0.35");
  }, { scope: containerRef });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let raf = 0;
    let time = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const warp = (x: number, y: number) => {
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distance = Math.hypot(dx, dy);
      const radius = 260;
      if (!distance || distance > radius) return { x, y };
      const influence = 1 - distance / radius;
      const wave = Math.sin(distance * 0.05 - time * 3.5) * 14 * influence;
      return { x: x + (dx / distance) * wave, y: y + (dy / distance) * wave };
    };

    const line = (x1: number, y1: number, x2: number, y2: number) => {
      const segments = 18;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const p = warp(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
    };

    const draw = () => {
      time += 0.018;
      ctx.fillStyle = "#E4E2E3";
      ctx.fillRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      ctx.strokeStyle = "rgba(22,22,22,.09)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      for (let i = 0; i <= 9; i++) line(cx, cy, (width / 9) * i, 0);
      for (let i = 0; i <= 9; i++) line(cx, cy, (width / 9) * i, height);
      for (let i = 0; i <= 6; i++) line(cx, cy, 0, (height / 6) * i);
      for (let i = 0; i <= 6; i++) line(cx, cy, width, (height / 6) * i);
      ctx.stroke();

      const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 190);
      glow.addColorStop(0, "rgba(244,74,34,.13)");
      glow.addColorStop(1, "rgba(244,74,34,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#E4E2E3] text-[#161616] font-jakarta">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute top-6 left-8 right-8 z-40 flex items-start justify-between">
        <div ref={logoRef} className="flex items-center gap-3 text-[#F44A22]">
          <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0L15.3 8.7L24 12L15.3 15.3L12 24L8.7 15.3L0 12L8.7 8.7Z" />
          </svg>
          <span className="font-oswald text-xl md:text-2xl tracking-[0.2em]">GWB</span>
        </div>

        <div className="hidden lg:flex max-w-[320px] flex-col items-end gap-3 text-right">
          <div className="font-cormorant text-3xl italic">Gary WILFRED-BORILLA</div>
          <p className="text-xs leading-relaxed text-[#161616]/75">
            Je conçois des systèmes digitaux qui relient stratégie, intelligence artificielle, expériences web et marketing.
          </p>
          <button onClick={() => startTransition("/contact")} className="rounded-full border border-[#161616]/30 px-4 py-2 text-[10px] font-bold tracking-[0.18em] transition hover:border-[#F44A22] hover:text-[#F44A22]">
            ME CONTACTER ↗
          </button>
        </div>
      </div>

      <div ref={contentRef} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-8 select-none">
          <div className="font-oswald text-[9vw] font-black uppercase leading-[0.8] tracking-tighter text-[#161616]/10">JE CONÇOIS</div>
          <div className="mt-4 min-h-[1.2em] px-5 text-center font-oswald text-[7vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter text-stroke-orange">
            {displayText}<span className="animate-pulse">|</span>
          </div>
        </div>

        <img src="/profile-placeholder.svg" alt="Gary WILFRED-BORILLA" className="absolute bottom-12 left-1/2 h-[72%] max-w-[540px] -translate-x-1/2 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,.18)]" />

        <div className="pointer-events-auto absolute bottom-24 left-8 hidden w-64 flex-col gap-4 lg:flex">
          {[
            ["STRATÉGIE", "Vision & croissance"],
            ["IA", "Agents & automatisation"],
            ["WEB", "Expériences digitales"],
            ["MARKETING", "Communication & acquisition"],
          ].map(([title, label]) => (
            <div key={title} className="border-t border-[#161616]/15 pt-3">
              <div className="font-oswald text-2xl font-bold text-[#F44A22]">{title}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#161616]/55">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-40 w-[110vw] max-w-[110%] -translate-x-1/2 -rotate-2 overflow-hidden border-y border-[#161616]/20 bg-[#F44A22] py-3.5 shadow-lg">
        <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap font-oswald text-base font-extrabold uppercase tracking-widest text-[#FEF8E8] md:text-lg">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="flex items-center gap-12">
              <span>STRATÉGIE & CROISSANCE</span><span>✦</span><span>AGENTS IA & AUTOMATISATION</span><span>✦</span><span>WEB & EXPÉRIENCES DIGITALES</span><span>✦</span><span>MARKETING DIGITAL & COMMUNICATION</span><span>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
