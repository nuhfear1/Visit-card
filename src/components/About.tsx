"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "STRATÉGIE & CROISSANCE",
    signal: "Les idées s’accumulent, les priorités bougent et il devient difficile de savoir quoi traiter en premier.",
    text: "Je clarifie le problème, les objectifs et les leviers réellement utiles : positionnement, acquisition, conversion, arbitrages et feuille de route.",
    outcome: "Une direction claire et des décisions qui peuvent être exécutées.",
  },
  {
    num: "02",
    title: "AGENTS IA & AUTOMATISATION",
    signal: "Des messages, relances, saisies ou tâches répétitives consomment encore du temps humain chaque semaine.",
    text: "Je transforme ces flux en systèmes capables d’agir : agents IA, assistants métier, automatisations et intégrations avec vos outils existants.",
    outcome: "Moins d’exécution manuelle, moins d’oubli et plus de temps pour les tâches qui demandent réellement un humain.",
  },
  {
    num: "03",
    title: "WEB & EXPÉRIENCES DIGITALES",
    signal: "Le site existe, mais il explique mal, oriente peu ou laisse trop de visiteurs sans comprendre quoi faire ensuite.",
    text: "Je retravaille l’architecture, l’expérience, les messages et les parcours pour rendre l’offre plus évidente et l’action plus naturelle.",
    outcome: "Une expérience plus claire, plus crédible et mieux orientée vers la conversion.",
  },
  {
    num: "04",
    title: "MARKETING DIGITAL & COMMUNICATION",
    signal: "Vous investissez pour être visible ou acquérir, mais la croissance plafonne, les campagnes manquent de précision ou le message se dilue.",
    text: "J’interviens sur le SEA, les Social Ads, les campagnes, le copywriting, l’emailing et le contenu en fonction de l’objectif à atteindre.",
    outcome: "Des actions mieux ciblées, pilotées par les bons indicateurs et reliées à un objectif business clair.",
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
          <div className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#F44A22] lg:col-start-1 lg:row-start-1">Avant de choisir un service, il faut savoir ce qui freine le projet.</div>
          <h1 className="font-oswald font-black text-[11vw] md:text-[8vw] uppercase leading-[0.82] tracking-tighter lg:col-start-1 lg:row-start-2">
            VOIR CLAIR.
            <span className="block text-stroke-orange">CHOISIR JUSTE.</span>
            AGIR.
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
            Un projet n’a pas besoin de tout. Parfois un seul levier suffit. Parfois plusieurs doivent travailler ensemble. Le point de départ reste le même : identifier ce qui bloque vraiment avant de décider quoi activer.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <article
              key={service.num}
              className={`group min-h-[390px] rounded-[2.2rem] border-3 border-[#161616] p-7 md:p-9 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                index === 0 ? "bg-[#161616] text-[#FEF8E8]" : index === 1 ? "bg-[#F44A22] text-white" : index === 2 ? "bg-[#E4E2E3]" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className={`font-cormorant text-6xl font-bold ${index < 2 ? "opacity-45" : "text-[#F44A22]/55"}`}>{service.num}</span>
                <span className={`rounded-full border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] ${index < 2 ? "border-white/30 text-white/70" : "border-[#161616]/20 text-[#161616]/55"}`}>
                  À ACTIVER QUAND
                </span>
              </div>

              <div className="mt-8">
                <p className={`mb-6 text-sm leading-6 md:text-base ${index === 0 ? "text-white/78" : index === 1 ? "text-white/90" : "text-[#161616]/72"}`}>
                  {service.signal}
                </p>
                <h2 className="font-oswald text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-5">{service.title}</h2>
                <p className={`text-sm leading-7 md:text-base ${index === 0 ? "text-white/65" : index === 1 ? "text-white/82" : "text-[#161616]/62"}`}>
                  {service.text}
                </p>
                <div className={`mt-6 border-t pt-4 ${index < 2 ? "border-white/20" : "border-[#161616]/15"}`}>
                  <div className={`mb-2 text-[9px] font-bold uppercase tracking-[0.18em] ${index < 2 ? "text-white/45" : "text-[#161616]/45"}`}>CE QUE ÇA DÉBLOQUE</div>
                  <p className={`text-sm font-medium leading-6 ${index === 0 ? "text-white/88" : index === 1 ? "text-white" : "text-[#161616]/78"}`}>{service.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[2.2rem] border-3 border-[#161616] bg-[#7B2CBF] p-8 md:p-10 text-white flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/65 mb-4">VOUS N’AVEZ PAS À CHOISIR LE SERVICE.</div>
            <h3 className="font-oswald text-3xl md:text-5xl font-black uppercase leading-none">DITES-MOI CE QUI BLOQUE. JE VOUS DIRAI OÙ INTERVENIR.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72">Un problème, un objectif, quelques éléments de contexte suffisent pour commencer.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#161616] transition-transform hover:scale-105">
            ME DIRE CE QUI BLOQUE ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
