"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";

const links = [
  { label: "EMAIL", value: "TO CONFIGURE", icon: Mail },
  { label: "LINKEDIN", value: "TO CONFIGURE", icon: Linkedin },
  { label: "GITHUB", value: "nuhfear1", icon: Github, href: "https://github.com/nuhfear1" },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(titleRef.current, { y: 35, opacity: 0, duration: 0.9, ease: "power3.out" })
      .from(cardsRef.current?.children || [], { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.45");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#E4E2E3] px-6 pb-20 pt-28 text-[#161616] md:px-12 lg:px-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#F44A22]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#7B2CBF]/10 blur-3xl" />

      <div className="mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-between gap-16">
        <div ref={titleRef}>
          <div className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[#F44A22]">CONTACT / NEXT MOVE</div>
          <h1 className="max-w-5xl font-oswald text-[13vw] font-black uppercase leading-[0.78] tracking-tighter md:text-[10vw]">
            LET&apos;S BUILD
            <span className="block text-stroke-orange">SOMETHING</span>
          </h1>
          <p className="mt-8 max-w-2xl font-jakarta text-sm leading-7 text-[#161616]/65 md:text-base">
            This section is intentionally clean for the first repository import. Real contact details and social profiles will be connected once they are confirmed.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {links.map(({ label, value, icon: Icon, href }) => {
            const body = (
              <>
                <div className="flex items-start justify-between">
                  <Icon className="h-5 w-5 text-[#F44A22]" />
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#161616]/45">{label}</div>
                  <div className="mt-2 font-oswald text-xl font-bold uppercase tracking-wide">{value}</div>
                </div>
              </>
            );

            return href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex min-h-52 flex-col justify-between rounded-[2rem] border-2 border-[#161616] bg-white/55 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[#F44A22] hover:text-white">
                {body}
              </a>
            ) : (
              <div key={label} className="group flex min-h-52 flex-col justify-between rounded-[2rem] border-2 border-[#161616] bg-white/55 p-6 backdrop-blur-xl">
                {body}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl items-center justify-between border-t border-[#161616]/20 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#161616]/50">
        <span>Gary WILFRED-BORILLA</span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
