"use client";

import { useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type BrandWallCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  companies: string;
};

type CompanyItem = {
  name: string;
  meta: string;
  logo?: string;
  surface?: string;
  imageClass?: string;
  wordmark?: boolean;
};

const copyByLocale: Record<Locale, BrandWallCopy> = {
  fr: {
    eyebrow: "DES CONTEXTES RÉELS",
    title: "DES MISSIONS DIFFÉRENTES. LA MÊME EXIGENCE DE RÉSULTAT.",
    subtitle: "Ces environnements montrent où cette méthode a déjà été mise à l’épreuve : comprendre l’enjeu, choisir le bon levier et produire un résultat utile dans le contexte réel de l’entreprise.",
    companies: "Entreprises & environnements de mission",
  },
  en: {
    eyebrow: "REAL-WORLD CONTEXTS",
    title: "DIFFERENT MISSIONS. THE SAME STANDARD FOR RESULTS.",
    subtitle: "These environments show where this approach has already been tested: understand the challenge, choose the right lever and produce a useful result in the company’s real context.",
    companies: "Companies & project environments",
  },
  es: {
    eyebrow: "CONTEXTOS REALES",
    title: "MISIONES DIFERENTES. LA MISMA EXIGENCIA DE RESULTADO.",
    subtitle: "Estos entornos muestran dónde este enfoque ya se ha puesto a prueba: entender el reto, elegir la palanca adecuada y producir un resultado útil dentro del contexto real de la empresa.",
    companies: "Empresas y entornos de proyecto",
  },
  pt: {
    eyebrow: "CONTEXTOS REAIS",
    title: "MISSÕES DIFERENTES. A MESMA EXIGÊNCIA DE RESULTADO.",
    subtitle: "Esses ambientes mostram onde essa abordagem já foi colocada à prova: entender o desafio, escolher a alavanca certa e produzir um resultado útil no contexto real da empresa.",
    companies: "Empresas & ambientes de projeto",
  },
  gcf: {
    eyebrow: "KONTÈKS TRAVAY VRÉ",
    title: "MISYON DIFÉRAN. MENM EGZIJANS ASI RÉZILTA.",
    subtitle: "Sé lanvironnman-lasa ka montré ola metòd-la ja sèvi: konprann sa ki an jwé, chwazi bon lévyé-la é pwodui on rézilta ki itil adan vré kontèks a antrèpriz-la.",
    companies: "Antrèpriz & lanvironnman pwojé",
  },
  ar: {
    eyebrow: "سياقات عمل حقيقية",
    title: "مهام مختلفة. المعيار نفسه للنتيجة.",
    subtitle: "هذه البيئات توضح أين اختُبر هذا النهج بالفعل: فهم التحدي، اختيار الرافعة المناسبة وإنتاج نتيجة مفيدة داخل السياق الحقيقي للشركة.",
    companies: "شركات وبيئات عمل",
  },
  ja: {
    eyebrow: "実際のプロジェクト環境",
    title: "異なるミッション。同じ成果基準。",
    subtitle: "ここにある環境は、この進め方が実際に試されてきた場所です。課題を理解し、適切なレバーを選び、企業の現実に合った有効な成果につなげます。",
    companies: "企業・プロジェクト環境",
  },
  zh: {
    eyebrow: "真实项目环境",
    title: "任务不同，对结果的要求不变。",
    subtitle: "这些环境展示了这套方法已经落地的真实场景：理解挑战、选择正确杠杆，并在企业真实语境中产出有用结果。",
    companies: "企业与项目环境",
  },
  ko: {
    eyebrow: "실제 프로젝트 환경",
    title: "미션은 달라도 결과에 대한 기준은 같습니다.",
    subtitle: "이 환경들은 같은 접근이 실제로 검증된 맥락을 보여 줍니다. 과제를 이해하고, 맞는 레버를 고르고, 기업의 실제 상황에서 쓸모 있는 결과를 만듭니다.",
    companies: "기업 & 프로젝트 환경",
  },
};

const companyItems: CompanyItem[] = [
  {
    name: "PSG Academy USA",
    meta: "Digital",
    logo: "https://psgacademyusa.s3.amazonaws.com/wp-content/uploads/2024/09/20070035/USA_white.png",
    surface: "bg-[#071A35]",
    imageClass: "max-h-24 max-w-[82%]",
  },
  {
    name: "Promocash",
    meta: "Acquisition",
    logo: "https://www.franchise-magazine.com/uploads/2025/11/Franchise-Distribution-Promocash-logo-2025.jpg",
    surface: "bg-white",
    imageClass: "max-h-24 max-w-[78%]",
  },
  {
    name: "Yateo",
    meta: "Performance",
    logo: "https://www.yateo.com/image/front/svg/logo-yateo-forme.svg",
    surface: "bg-white",
    imageClass: "max-h-20 max-w-[42%]",
    wordmark: true,
  },
  { name: "Egila", meta: "Real estate", surface: "bg-[#FEF8E8]" },
  { name: "Dayloom", meta: "Digital", surface: "bg-[#FEF8E8]" },
];

function CompanyCard({ item, index }: { item: CompanyItem; index: number }) {
  const [failed, setFailed] = useState(false);
  const hasLogo = Boolean(item.logo) && !failed;
  const isWideBottomCard = index > 2;

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.035] p-2 transition duration-300 hover:-translate-y-1 hover:border-[#F44A22]/55 ${
        isWideBottomCard ? "sm:col-span-1 lg:col-span-3" : "lg:col-span-2"
      }`}
    >
      <div className={`flex min-h-[190px] items-center justify-center overflow-hidden rounded-[22px] px-8 py-8 md:min-h-[220px] ${item.surface ?? "bg-white"}`}>
        {hasLogo ? (
          <div className="flex w-full items-center justify-center gap-5">
            <img
              src={item.logo}
              alt={`${item.name} logo`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className={`h-auto w-auto object-contain ${item.imageClass ?? "max-h-24 max-w-[80%]"}`}
            />
            {item.wordmark ? (
              <span className="font-oswald text-4xl font-black uppercase tracking-[-0.04em] text-[#161616] md:text-5xl">YATEO</span>
            ) : null}
          </div>
        ) : (
          <span className="font-oswald text-4xl font-black uppercase tracking-[-0.04em] text-[#161616] md:text-6xl">{item.name}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-4 md:px-5">
        <span className="font-oswald text-base font-bold uppercase tracking-[0.04em] text-white md:text-lg">{item.name}</span>
        <span className="rounded-full border border-white/12 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 transition group-hover:border-[#F44A22]/35 group-hover:text-white/65">{item.meta}</span>
      </div>
    </article>
  );
}

export default function ProjectBrandWall({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#161616] text-white" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-16 lg:px-20">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,.9fr)] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F44A22]">
              <BriefcaseBusiness size={15} />
              {copy.eyebrow}
            </div>
            <h2 className="max-w-4xl font-oswald text-4xl font-black uppercase leading-[.92] tracking-tight md:text-6xl">{copy.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/55 md:text-base">{copy.subtitle}</p>
        </div>

        <div className="mt-12 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40 md:mt-14">
          <BriefcaseBusiness size={13} />
          {copy.companies}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {companyItems.map((item, index) => (
            <CompanyCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
