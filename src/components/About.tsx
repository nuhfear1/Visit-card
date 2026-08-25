"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "STRATÉGIE & CROISSANCE",
    text: "Audit, positionnement, stratégie digitale, acquisition, parcours de conversion et feuille de route de croissance. L’objectif : donner une direction claire avant d’activer les leviers.",
  },
  {
    num: "02",
    title: "AGENTS IA & AUTOMATISATION",
    text: "Conception d’agents IA, assistants métier, automatisation de workflows et intégrations avec les outils de l’entreprise pour accélérer les opérations et simplifier les tâches répétitives.",
  },
  {
    num: "03",
    title: "WEB & EXPÉRIENCES DIGITALES",
    text: "Sites vitrines, landing pages, interfaces interactives, parcours digitaux et expériences web pensées pour être utiles, mémorables et orientées conversion.",
  },
  {
    num: "04",
    title: "MARKETING DIGITAL & COMMUNICATION",
    text: "SEO, acquisition payante, réseaux sociaux, contenu, copywriting, emailing, campagnes et mesure de performance réunis dans une logique cohérente plutôt qu’en services isolés.",
  },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(logoRef.current, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(titleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .from(cardsRef.current?.children || [], { y: 28, opacity: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" }, "-=0.45");
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
        SERVICES
      </div>

      <div className="max-w-7xl w-full mx-auto mt-10 flex flex-col">
        <div
          ref={titleRef}
          className="mb-12 grid w-full grid-cols-1 md:mb-16 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:gap-x-10 xl:gap-x-14"
        >
          <div className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#F44A22] lg:col-start-1 lg:row-start-1">Une approche globale, quatre pôles</div>
          <h1 className="font-oswald font-black text-[11vw] md:text-[8vw] uppercase leading-[0.82] tracking-tighter lg:col-start-1 lg:row-start-2">
            CONCEVOIR.
            <span className="block text-stroke-orange">CONNECTER.</span>
            FAIRE CROÎTRE.
          </h1>
          <div className="relative mt-8 aspect-[4/5] w-full max-w-[390px] justify-self-center overflow-hidden lg:col-start-2 lg:row-start-2 lg:row-span-2 lg:mt-0 lg:justify-self-end">
            <img
              src="/Visit-card/gary-services.webp?v=2"
              alt="Gary dans un décor tropical"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#161616]/65 md:text-base lg:col-start-1 lg:row-start-3">
            Je ne présente pas une collection de compétences séparées. Je construis des systèmes digitaux cohérents où stratégie, intelligence artificielle, web et marketing travaillent ensemble autour d’un même objectif business.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <article
              key={service.num}
              className={`group min-h-[330px] rounded-[2.2rem] border-3 border-[#161616] p-7 md:p-9 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                index === 0 ? "bg-[#161616] text-[#FEF8E8]" : index === 1 ? "bg-[#F44A22] text-white" : index === 2 ? "bg-[#E4E2E3]" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className={`font-cormorant text-6xl font-bold ${index < 2 ? "opacity-45" : "text-[#F44A22]/55"}`}>{service.num}</span>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border text-xl transition-transform duration-300 group-hover:rotate-45 ${index < 2 ? "border-white/35" : "border-[#161616]/30"}`}>↗</span>
              </div>
              <div>
                <h2 className="font-oswald text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-5">{service.title}</h2>
                <p className={`text-sm md:text-base leading-7 ${index === 0 ? "text-white/72" : index === 1 ? "text-white/86" : "text-[#161616]/65"}`}>
                  {service.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[2.2rem] border-3 border-[#161616] bg-[#7B2CBF] p-8 md:p-10 text-white flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/65 mb-4">Un seul système, plusieurs leviers</div>
            <h3 className="font-oswald text-3xl md:text-5xl font-black uppercase leading-none">Le bon levier dépend du problème à résoudre.</h3>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#161616] transition-transform hover:scale-105">
            Parlons de votre projet ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
