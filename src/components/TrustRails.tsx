"use client";

import React from "react";
import { BadgeCheck, Boxes, BriefcaseBusiness, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type TrustRailsProps = {
  locale: Locale;
  variant: "services" | "projects";
};

type Labels = {
  eyebrow: string;
  title: string;
  subtitle: string;
  certs: string;
  tools: string;
  companies: string;
};

const labels: Record<Locale, Labels> = {
  fr: { eyebrow: "PREUVES & ÉCOSYSTÈME", title: "DES OUTILS. DES CERTIFICATIONS. DU TERRAIN.", subtitle: "Une sélection des environnements que j’utilise réellement dans mes missions.", certs: "Certifications", tools: "Stack & outils", companies: "Entreprises & environnements de mission" },
  en: { eyebrow: "PROOF & ECOSYSTEM", title: "TOOLS. CERTIFICATIONS. REAL-WORLD WORK.", subtitle: "A selection of the environments I actually use across projects.", certs: "Certifications", tools: "Stack & tools", companies: "Companies & project environments" },
  es: { eyebrow: "PRUEBA & ECOSISTEMA", title: "HERRAMIENTAS. CERTIFICACIONES. EXPERIENCIA REAL.", subtitle: "Una selección de los entornos que utilizo de verdad en mis proyectos.", certs: "Certificaciones", tools: "Stack y herramientas", companies: "Empresas y entornos de proyecto" },
  pt: { eyebrow: "PROVA & ECOSSISTEMA", title: "FERRAMENTAS. CERTIFICAÇÕES. EXPERIÊNCIA REAL.", subtitle: "Uma seleção dos ambientes que realmente utilizo nos projetos.", certs: "Certificações", tools: "Stack & ferramentas", companies: "Empresas & ambientes de projeto" },
  gcf: { eyebrow: "PRÈV & ÉKOSISTÈM", title: "ZOUTI. SÈTIFIKASYON. TRAVAY VRÉ.", subtitle: "On séléksyon zouti é lanvironnman an ka sèvi vréman adan misyon an mwen.", certs: "Sètifikasyon", tools: "Stack & zouti", companies: "Antrèpriz & lanvironnman pwojé" },
  ar: { eyebrow: "الأدلة والمنظومة", title: "أدوات. شهادات. خبرة عملية.", subtitle: "مجموعة من البيئات والأدوات التي أستخدمها فعلياً في المشاريع.", certs: "الشهادات", tools: "الأدوات والتقنيات", companies: "شركات وبيئات عمل" },
  ja: { eyebrow: "実績とエコシステム", title: "ツール。認定。実務経験。", subtitle: "実際のプロジェクトで使用している環境とツールの一部です。", certs: "認定", tools: "技術スタックとツール", companies: "企業・プロジェクト環境" },
  zh: { eyebrow: "证明与生态", title: "工具。认证。真实项目经验。", subtitle: "这里展示我在真实项目中实际使用的一部分工具与环境。", certs: "认证", tools: "技术栈与工具", companies: "企业与项目环境" },
  ko: { eyebrow: "검증과 생태계", title: "도구. 인증. 실제 프로젝트 경험.", subtitle: "실제 프로젝트에서 사용하는 환경과 도구 중 일부입니다.", certs: "인증", tools: "기술 스택 & 도구", companies: "기업 & 프로젝트 환경" },
};

const certificationItems = [
  { name: "Google Ads", meta: "Certified" },
  { name: "Google Analytics", meta: "Certified" },
];

const toolItems = [
  { name: "Google Ads", meta: "SEA" },
  { name: "Google Analytics", meta: "Analytics" },
  { name: "GitHub", meta: "Delivery" },
  { name: "Next.js", meta: "Web" },
  { name: "React", meta: "Web" },
  { name: "Tailwind CSS", meta: "UI" },
  { name: "OpenAI", meta: "AI" },
  { name: "GSAP", meta: "Motion" },
];

const companyItems = [
  { name: "PSG Academy USA", meta: "Digital" },
  { name: "Promocash", meta: "Acquisition" },
  { name: "Yateo", meta: "Performance" },
  { name: "Egila", meta: "Real estate" },
  { name: "Dayloom", meta: "Digital" },
];

function Rail({ items, reverse = false, compact = false }: { items: { name: string; meta: string }[]; reverse?: boolean; compact?: boolean }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="trust-rail-mask overflow-hidden py-1" dir="ltr">
      <div className={`trust-rail-track ${reverse ? "trust-rail-reverse" : ""}`}>
        {repeated.map((item, index) => (
          <div key={`${item.name}-${index}`} className={`group flex shrink-0 items-center gap-3 rounded-full border border-[#161616]/15 bg-white/70 px-4 shadow-[0_8px_30px_rgba(0,0,0,.06)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#F44A22]/35 hover:bg-white ${compact ? "py-2.5" : "py-3"}`}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#161616] text-white transition group-hover:bg-[#F44A22]">
              <Sparkles size={14} strokeWidth={1.8} />
            </span>
            <span className="whitespace-nowrap font-oswald text-sm font-bold uppercase tracking-[0.04em] text-[#161616] sm:text-base">{item.name}</span>
            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.14em] text-[#161616]/35">{item.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustRails({ locale, variant }: TrustRailsProps) {
  const copy = labels[locale];
  const isProjects = variant === "projects";

  return (
    <section className={`${isProjects ? "bg-[#161616] text-white" : "bg-[#FEF8E8] text-[#161616]"} overflow-hidden border-y ${isProjects ? "border-white/10" : "border-[#161616]/10"}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-16 lg:px-20">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,.9fr)] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F44A22]">
              {isProjects ? <BriefcaseBusiness size={15} /> : <BadgeCheck size={15} />}
              {copy.eyebrow}
            </div>
            <h2 className="max-w-4xl font-oswald text-4xl font-black uppercase leading-[.92] tracking-tight md:text-6xl">{copy.title}</h2>
          </div>
          <p className={`${isProjects ? "text-white/55" : "text-[#161616]/55"} max-w-xl text-sm leading-7 md:text-base`}>{copy.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4 pb-14 md:pb-16">
        {isProjects ? (
          <>
            <div className="px-6 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 md:px-12 lg:px-20">{copy.companies}</div>
            <Rail items={companyItems} />
          </>
        ) : (
          <>
            <div>
              <div className="mb-3 flex items-center gap-2 px-6 text-[9px] font-bold uppercase tracking-[0.18em] text-[#161616]/40 md:px-12 lg:px-20"><BadgeCheck size={13} />{copy.certs}</div>
              <Rail items={certificationItems} compact />
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2 px-6 text-[9px] font-bold uppercase tracking-[0.18em] text-[#161616]/40 md:px-12 lg:px-20"><Boxes size={13} />{copy.tools}</div>
              <Rail items={toolItems} reverse />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
