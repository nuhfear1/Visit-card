"use client";

import React from "react";
import { BadgeCheck, Bot, Boxes, BriefcaseBusiness, ChartNoAxesCombined, Code2 } from "lucide-react";
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
  ai: string;
  marketing: string;
  web: string;
  companies: string;
};

type BrandItem = {
  name: string;
  meta: string;
  logo?: string;
};

const labels: Record<Locale, Labels> = {
  fr: { eyebrow: "PREUVES & ÉCOSYSTÈME", title: "DES OUTILS. DES CERTIFICATIONS. DU TERRAIN.", subtitle: "Une stack pensée autour des leviers que j’active réellement : IA, automatisation, acquisition, data et expériences web.", certs: "Certifications", ai: "IA & automatisation", marketing: "Marketing digital & data", web: "Web, produit & delivery", companies: "Entreprises & environnements de mission" },
  en: { eyebrow: "PROOF & ECOSYSTEM", title: "TOOLS. CERTIFICATIONS. REAL-WORLD WORK.", subtitle: "A stack built around the levers I actually activate: AI, automation, acquisition, data and web experiences.", certs: "Certifications", ai: "AI & automation", marketing: "Digital marketing & data", web: "Web, product & delivery", companies: "Companies & project environments" },
  es: { eyebrow: "PRUEBA & ECOSISTEMA", title: "HERRAMIENTAS. CERTIFICACIONES. EXPERIENCIA REAL.", subtitle: "Un stack pensado alrededor de las palancas que activo de verdad: IA, automatización, adquisición, datos y experiencias web.", certs: "Certificaciones", ai: "IA y automatización", marketing: "Marketing digital y datos", web: "Web, producto y delivery", companies: "Empresas y entornos de proyecto" },
  pt: { eyebrow: "PROVA & ECOSSISTEMA", title: "FERRAMENTAS. CERTIFICAÇÕES. EXPERIÊNCIA REAL.", subtitle: "Uma stack construída em torno das alavancas que realmente ativo: IA, automação, aquisição, dados e experiências web.", certs: "Certificações", ai: "IA & automação", marketing: "Marketing digital & dados", web: "Web, produto & delivery", companies: "Empresas & ambientes de projeto" },
  gcf: { eyebrow: "PRÈV & ÉKOSISTÈM", title: "ZOUTI. SÈTIFIKASYON. TRAVAY VRÉ.", subtitle: "On stack ki ka suiv lévyé an ka aktivé vréman : IA, otomatik, acquisition, data é èkspéryans web.", certs: "Sètifikasyon", ai: "IA & otomatik", marketing: "Maketing dijital & data", web: "Web, pwodwi & delivery", companies: "Antrèpriz & lanvironnman pwojé" },
  ar: { eyebrow: "الأدلة والمنظومة", title: "أدوات. شهادات. خبرة عملية.", subtitle: "منظومة أدوات مرتبطة مباشرة بالروافع التي أستخدمها: الذكاء الاصطناعي، الأتمتة، الاستحواذ، البيانات وتجارب الويب.", certs: "الشهادات", ai: "الذكاء الاصطناعي والأتمتة", marketing: "التسويق الرقمي والبيانات", web: "الويب والمنتج والتنفيذ", companies: "شركات وبيئات عمل" },
  ja: { eyebrow: "実績とエコシステム", title: "ツール。認定。実務経験。", subtitle: "AI、自動化、集客、データ、Web体験という実務のレバーを中心に構成したスタックです。", certs: "認定", ai: "AI・自動化", marketing: "デジタルマーケティング・データ", web: "Web・プロダクト・デリバリー", companies: "企業・プロジェクト環境" },
  zh: { eyebrow: "证明与生态", title: "工具。认证。真实项目经验。", subtitle: "围绕我实际使用的核心杠杆搭建：AI、自动化、获客、数据与Web体验。", certs: "认证", ai: "AI与自动化", marketing: "数字营销与数据", web: "Web、产品与交付", companies: "企业与项目环境" },
  ko: { eyebrow: "검증과 생태계", title: "도구. 인증. 실제 프로젝트 경험.", subtitle: "AI, 자동화, 퍼포먼스 마케팅, 데이터, 웹 경험 등 실제로 사용하는 핵심 레버 중심의 스택입니다.", certs: "인증", ai: "AI & 자동화", marketing: "디지털 마케팅 & 데이터", web: "웹, 프로덕트 & 딜리버리", companies: "기업 & 프로젝트 환경" },
};

const SIMPLE_ICONS = "https://raw.githubusercontent.com/simple-icons/simple-icons/4a79bb55697c85b8bc9f3caa22be747e0277ad4f/icons";
const LOBE_ICONS = "https://raw.githubusercontent.com/lobehub/lobe-icons/4aaf4ee1fb2678a7f989ea570f0f6ce14a9abf75/packages/static-svg/icons";
const simpleLogo = (slug: string) => `${SIMPLE_ICONS}/${slug}.svg`;
const lobeLogo = (slug: string) => `${LOBE_ICONS}/${slug}.svg`;

const certificationItems: BrandItem[] = [
  { name: "Google Ads", meta: "Certification", logo: simpleLogo("googleads") },
  { name: "Google Analytics", meta: "Certification", logo: simpleLogo("googleanalytics") },
];

const aiItems: BrandItem[] = [
  { name: "OpenAI", meta: "AI", logo: lobeLogo("openai") },
  { name: "Anthropic", meta: "AI", logo: lobeLogo("anthropic") },
  { name: "Google Gemini", meta: "AI", logo: lobeLogo("gemini-color") },
  { name: "n8n", meta: "Automation", logo: simpleLogo("n8n") },
  { name: "Make", meta: "Automation", logo: simpleLogo("make") },
  { name: "Zapier", meta: "Automation", logo: simpleLogo("zapier") },
];

const marketingItems: BrandItem[] = [
  { name: "Google Ads", meta: "SEA", logo: simpleLogo("googleads") },
  { name: "Meta Ads", meta: "Social Ads", logo: simpleLogo("meta") },
  { name: "TikTok Ads", meta: "Social Ads", logo: simpleLogo("tiktok") },
  { name: "LinkedIn Ads", meta: "B2B Ads", logo: simpleLogo("linkedin") },
  { name: "Google Analytics", meta: "Analytics", logo: simpleLogo("googleanalytics") },
  { name: "Google Tag Manager", meta: "Tracking", logo: simpleLogo("googletagmanager") },
  { name: "HubSpot", meta: "CRM", logo: simpleLogo("hubspot") },
  { name: "Brevo", meta: "CRM / Email", logo: simpleLogo("brevo") },
];

const webItems: BrandItem[] = [
  { name: "Next.js", meta: "Web", logo: simpleLogo("nextdotjs") },
  { name: "React", meta: "Web", logo: simpleLogo("react") },
  { name: "Tailwind CSS", meta: "UI", logo: simpleLogo("tailwindcss") },
  { name: "GitHub", meta: "Delivery", logo: simpleLogo("github") },
  { name: "Vercel", meta: "Deploy", logo: simpleLogo("vercel") },
  { name: "Figma", meta: "Design", logo: simpleLogo("figma") },
  { name: "GSAP", meta: "Motion", logo: simpleLogo("gsap") },
];

const companyItems: BrandItem[] = [
  { name: "PSG Academy USA", meta: "Digital" },
  { name: "Promocash", meta: "Acquisition" },
  { name: "Yateo", meta: "Performance" },
  { name: "Egila", meta: "Real estate" },
  { name: "Dayloom", meta: "Digital" },
];

function Rail({ items, reverse = false, compact = false, dark = false }: { items: BrandItem[]; reverse?: boolean; compact?: boolean; dark?: boolean }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="trust-rail-mask overflow-hidden py-1" dir="ltr">
      <div className={`trust-rail-track ${reverse ? "trust-rail-reverse" : ""}`}>
        {repeated.map((item, index) => (
          <div key={`${item.name}-${index}`} className={`group flex shrink-0 items-center gap-3 rounded-full border px-4 shadow-[0_8px_30px_rgba(0,0,0,.06)] backdrop-blur-md transition hover:-translate-y-0.5 ${dark ? "border-white/15 bg-white/95 text-[#161616] hover:border-[#F44A22]/45" : "border-[#161616]/15 bg-white/75 text-[#161616] hover:border-[#F44A22]/35 hover:bg-white"} ${compact ? "py-2.5" : "py-3"}`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#161616]/10 bg-white p-2 transition-transform duration-300 group-hover:scale-110">
              {item.logo ? (
                <img src={item.logo} alt="" aria-hidden="true" className="h-full w-full object-contain" loading="lazy" decoding="async" />
              ) : (
                <span className="font-oswald text-[11px] font-black uppercase text-[#F44A22]">{item.name.slice(0, 2)}</span>
              )}
            </span>
            <span className="whitespace-nowrap font-oswald text-sm font-bold uppercase tracking-[0.04em] sm:text-base">{item.name}</span>
            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.14em] text-[#161616]/35">{item.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RailLabel({ icon, children, dark = false }: { icon: React.ReactNode; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-3 flex items-center gap-2 px-6 text-[9px] font-bold uppercase tracking-[0.18em] md:px-12 lg:px-20 ${dark ? "text-white/40" : "text-[#161616]/40"}`}>
      {icon}{children}
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

      <div className="space-y-5 pb-14 md:pb-16">
        {isProjects ? (
          <>
            <RailLabel dark icon={<BriefcaseBusiness size={13} />}>{copy.companies}</RailLabel>
            <Rail items={companyItems} dark />
          </>
        ) : (
          <>
            <div>
              <RailLabel icon={<BadgeCheck size={13} />}>{copy.certs}</RailLabel>
              <Rail items={certificationItems} compact />
            </div>
            <div>
              <RailLabel icon={<Bot size={13} />}>{copy.ai}</RailLabel>
              <Rail items={aiItems} reverse />
            </div>
            <div>
              <RailLabel icon={<ChartNoAxesCombined size={13} />}>{copy.marketing}</RailLabel>
              <Rail items={marketingItems} />
            </div>
            <div>
              <RailLabel icon={<Code2 size={13} />}>{copy.web}</RailLabel>
              <Rail items={webItems} reverse />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
