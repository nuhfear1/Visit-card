"use client";

import React from "react";
import { BadgeCheck, Bot, BriefcaseBusiness, ChartNoAxesCombined, Code2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type TrustRailsProps = {
  locale: Locale;
  variant: "services" | "projects";
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

type Labels = {
  services: SectionCopy;
  projects: SectionCopy;
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
  fr: {
    services: {
      eyebrow: "LES LEVIERS EN PRATIQUE",
      title: "LE BON OUTIL VIENT APRÈS LE BON DIAGNOSTIC.",
      subtitle: "Je ne pars pas d’une plateforme à placer. Je pars du problème à résoudre, puis j’active les outils capables de faire avancer le projet avec le moins de friction possible.",
    },
    projects: {
      eyebrow: "DES CONTEXTES RÉELS",
      title: "DES MISSIONS DIFFÉRENTES. LA MÊME EXIGENCE DE RÉSULTAT.",
      subtitle: "Ces environnements montrent où cette méthode a déjà été mise à l’épreuve : comprendre l’enjeu, choisir le bon levier et produire un résultat utile dans le contexte réel de l’entreprise.",
    },
    certs: "Certifications",
    ai: "IA & automatisation",
    marketing: "Marketing digital & data",
    web: "Web, produit & delivery",
    companies: "Entreprises & environnements de mission",
  },
  en: {
    services: {
      eyebrow: "THE LEVERS IN PRACTICE",
      title: "THE RIGHT TOOL COMES AFTER THE RIGHT DIAGNOSIS.",
      subtitle: "I do not start with a platform to push. I start with the problem to solve, then activate the tools that can move the project forward with as little friction as possible.",
    },
    projects: {
      eyebrow: "REAL-WORLD CONTEXTS",
      title: "DIFFERENT MISSIONS. THE SAME STANDARD FOR RESULTS.",
      subtitle: "These environments show where this approach has already been tested: understand the challenge, choose the right lever and produce a useful result in the company’s real context.",
    },
    certs: "Certifications",
    ai: "AI & automation",
    marketing: "Digital marketing & data",
    web: "Web, product & delivery",
    companies: "Companies & project environments",
  },
  es: {
    services: {
      eyebrow: "LAS PALANCAS EN LA PRÁCTICA",
      title: "LA HERRAMIENTA CORRECTA VIENE DESPUÉS DEL DIAGNÓSTICO CORRECTO.",
      subtitle: "No empiezo por una plataforma que haya que colocar. Empiezo por el problema que hay que resolver y después activo las herramientas capaces de hacer avanzar el proyecto con la menor fricción posible.",
    },
    projects: {
      eyebrow: "CONTEXTOS REALES",
      title: "MISIONES DIFERENTES. LA MISMA EXIGENCIA DE RESULTADO.",
      subtitle: "Estos entornos muestran dónde este enfoque ya se ha puesto a prueba: entender el reto, elegir la palanca adecuada y producir un resultado útil dentro del contexto real de la empresa.",
    },
    certs: "Certificaciones",
    ai: "IA y automatización",
    marketing: "Marketing digital y datos",
    web: "Web, producto y delivery",
    companies: "Empresas y entornos de proyecto",
  },
  pt: {
    services: {
      eyebrow: "AS ALAVANCAS NA PRÁTICA",
      title: "A FERRAMENTA CERTA VEM DEPOIS DO DIAGNÓSTICO CERTO.",
      subtitle: "Eu não começo por uma plataforma que precisa ser encaixada. Começo pelo problema a resolver e depois ativo as ferramentas capazes de fazer o projeto avançar com o mínimo de atrito possível.",
    },
    projects: {
      eyebrow: "CONTEXTOS REAIS",
      title: "MISSÕES DIFERENTES. A MESMA EXIGÊNCIA DE RESULTADO.",
      subtitle: "Esses ambientes mostram onde essa abordagem já foi colocada à prova: entender o desafio, escolher a alavanca certa e produzir um resultado útil no contexto real da empresa.",
    },
    certs: "Certificações",
    ai: "IA & automação",
    marketing: "Marketing digital & dados",
    web: "Web, produto & delivery",
    companies: "Empresas & ambientes de projeto",
  },
  gcf: {
    services: {
      eyebrow: "LÉVYÉ-LA ADAN TRAVAY VRÉ",
      title: "BON ZOUTI-LA KA VINI APRÉ BON DYAGNOSTIK-LA.",
      subtitle: "An pa ka koumansé èvè on zouti pou fòsé adan pwojé-la. An ka koumansé èvè pwoblèm-la, aprésa an ka aktivé zouti ki pé fè pwojé-la vansé èvè mwens friksyon posib.",
    },
    projects: {
      eyebrow: "KONTÈKS TRAVAY VRÉ",
      title: "MISYON DIFÉRAN. MENM EGZIJANS ASI RÉZILTA.",
      subtitle: "Sé lanvironnman-lasa ka montré ola metòd-la ja sèvi: konprann sa ki an jwé, chwazi bon lévyé-la é pwodui on rézilta ki itil adan vré kontèks a antrèpriz-la.",
    },
    certs: "Sètifikasyon",
    ai: "IA & otomatik",
    marketing: "Maketing dijital & data",
    web: "Web, pwodwi & delivery",
    companies: "Antrèpriz & lanvironnman pwojé",
  },
  ar: {
    services: {
      eyebrow: "الروافع في التطبيق",
      title: "الأداة المناسبة تأتي بعد التشخيص المناسب.",
      subtitle: "لا أبدأ بمنصة يجب فرضها على المشروع. أبدأ بالمشكلة التي يجب حلها، ثم أفعّل الأدوات القادرة على دفع المشروع إلى الأمام بأقل قدر ممكن من الاحتكاك.",
    },
    projects: {
      eyebrow: "سياقات عمل حقيقية",
      title: "مهام مختلفة. المعيار نفسه للنتيجة.",
      subtitle: "هذه البيئات توضح أين اختُبر هذا النهج بالفعل: فهم التحدي، اختيار الرافعة المناسبة وإنتاج نتيجة مفيدة داخل السياق الحقيقي للشركة.",
    },
    certs: "الشهادات",
    ai: "الذكاء الاصطناعي والأتمتة",
    marketing: "التسويق الرقمي والبيانات",
    web: "الويب والمنتج والتنفيذ",
    companies: "شركات وبيئات عمل",
  },
  ja: {
    services: {
      eyebrow: "レバーを実務で使う",
      title: "正しいツールは、正しい診断のあとに選ぶ。",
      subtitle: "最初から特定のツールを当てはめることはしません。まず解くべき問題を見極め、その後に摩擦を最小限にしながら前進できる手段を選びます。",
    },
    projects: {
      eyebrow: "実際のプロジェクト環境",
      title: "異なるミッション。同じ成果基準。",
      subtitle: "ここにある環境は、この進め方が実際に試されてきた場所です。課題を理解し、適切なレバーを選び、企業の現実に合った有効な成果につなげます。",
    },
    certs: "認定",
    ai: "AI・自動化",
    marketing: "デジタルマーケティング・データ",
    web: "Web・プロダクト・デリバリー",
    companies: "企業・プロジェクト環境",
  },
  zh: {
    services: {
      eyebrow: "把杠杆真正用起来",
      title: "先判断问题，再选择工具。",
      subtitle: "我不会先决定要推哪一个平台。先明确真正要解决的问题，再选择能以更少摩擦推动项目向前的工具。",
    },
    projects: {
      eyebrow: "真实项目环境",
      title: "任务不同，对结果的要求不变。",
      subtitle: "这些环境展示了这套方法已经落地的真实场景：理解挑战、选择正确杠杆，并在企业真实语境中产出有用结果。",
    },
    certs: "认证",
    ai: "AI与自动化",
    marketing: "数字营销与数据",
    web: "Web、产品与交付",
    companies: "企业与项目环境",
  },
  ko: {
    services: {
      eyebrow: "레버를 실제로 쓰는 방식",
      title: "올바른 도구는 올바른 진단 다음에 옵니다.",
      subtitle: "먼저 특정 플랫폼부터 정하지 않습니다. 해결해야 할 문제를 먼저 보고, 이후 가장 적은 마찰로 프로젝트를 움직일 수 있는 도구를 선택합니다.",
    },
    projects: {
      eyebrow: "실제 프로젝트 환경",
      title: "미션은 달라도 결과에 대한 기준은 같습니다.",
      subtitle: "이 환경들은 같은 접근이 실제로 검증된 맥락을 보여 줍니다. 과제를 이해하고, 맞는 레버를 고르고, 기업의 실제 상황에서 쓸모 있는 결과를 만듭니다.",
    },
    certs: "인증",
    ai: "AI & 자동화",
    marketing: "디지털 마케팅 & 데이터",
    web: "웹, 프로덕트 & 딜리버리",
    companies: "기업 & 프로젝트 환경",
  },
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
  const sectionCopy = isProjects ? copy.projects : copy.services;

  return (
    <section className={`${isProjects ? "bg-[#161616] text-white" : "bg-[#FEF8E8] text-[#161616]"} overflow-hidden border-y ${isProjects ? "border-white/10" : "border-[#161616]/10"}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-16 lg:px-20">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,.9fr)] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F44A22]">
              {isProjects ? <BriefcaseBusiness size={15} /> : <BadgeCheck size={15} />}
              {sectionCopy.eyebrow}
            </div>
            <h2 className="max-w-4xl font-oswald text-4xl font-black uppercase leading-[.92] tracking-tight md:text-6xl">{sectionCopy.title}</h2>
          </div>
          <p className={`${isProjects ? "text-white/55" : "text-[#161616]/55"} max-w-xl text-sm leading-7 md:text-base`}>{sectionCopy.subtitle}</p>
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
