"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import { usePageTransition } from "@/components/PageTransition";
import { localizedPath, type Locale } from "@/lib/i18n";

type HomeV2Copy = {
  statement: [string, string];
  situationsLabel: string;
  situations: Array<{ title: string; hint: string }>;
  proofLabel: string;
  proofTitle: string;
  proofSectors: string[];
  proofCta: string;
  doorsLabel: string;
  doors: Array<{ title: string; hint: string; href: "/about" | "/projects" | "/contact" }>;
  finalTitle: string;
  finalCta: string;
};

const copyByLocale: Record<Locale, HomeV2Copy> = {
  fr: {
    statement: ["VOUS VENEZ AVEC UN PROBLÈME.", "JE TROUVE LE BON LEVIER."],
    situationsLabel: "CE QUI BLOQUE",
    situations: [
      { title: "ÇA NE CONVERTIT PAS.", hint: "Offre · UX · acquisition" },
      { title: "ÇA PREND TROP DE TEMPS.", hint: "Process · automatisation" },
      { title: "ÇA NE SCALE PAS.", hint: "Système · data · IA" },
      { title: "ÇA MANQUE DE CLARTÉ.", hint: "Stratégie · expérience" },
    ],
    proofLabel: "TERRAIN RÉEL",
    proofTitle: "DES CONTEXTES TRÈS DIFFÉRENTS.",
    proofSectors: ["MÉDICAL", "SPORT", "RETAIL", "FINANCE", "TECH"],
    proofCta: "Voir les projets",
    doorsLabel: "ALLER PLUS LOIN",
    doors: [
      { title: "COMPRENDRE L’APPROCHE", hint: "Services", href: "/about" },
      { title: "VOIR LES PREUVES", hint: "Projets", href: "/projects" },
      { title: "PARLER DU PROBLÈME", hint: "Contact", href: "/contact" },
    ],
    finalTitle: "PAS BESOIN D’ARRIVER AVEC LA SOLUTION.",
    finalCta: "Parler du projet",
  },
  en: {
    statement: ["YOU BRING THE PROBLEM.", "I FIND THE RIGHT LEVER."],
    situationsLabel: "WHAT IS STUCK",
    situations: [
      { title: "IT DOESN’T CONVERT.", hint: "Offer · UX · acquisition" },
      { title: "IT TAKES TOO LONG.", hint: "Process · automation" },
      { title: "IT WON’T SCALE.", hint: "Systems · data · AI" },
      { title: "IT LACKS CLARITY.", hint: "Strategy · experience" },
    ],
    proofLabel: "REAL-WORLD CONTEXT",
    proofTitle: "VERY DIFFERENT ENVIRONMENTS.",
    proofSectors: ["HEALTHCARE", "SPORT", "RETAIL", "FINANCE", "TECH"],
    proofCta: "See the projects",
    doorsLabel: "GO DEEPER",
    doors: [
      { title: "UNDERSTAND THE APPROACH", hint: "Services", href: "/about" },
      { title: "SEE THE PROOF", hint: "Projects", href: "/projects" },
      { title: "TALK ABOUT THE PROBLEM", hint: "Contact", href: "/contact" },
    ],
    finalTitle: "YOU DON’T NEED TO ARRIVE WITH THE SOLUTION.",
    finalCta: "Talk about your project",
  },
  es: {
    statement: ["TÚ TRAES EL PROBLEMA.", "YO ENCUENTRO LA PALANCA CORRECTA."],
    situationsLabel: "LO QUE ESTÁ BLOQUEANDO",
    situations: [
      { title: "NO CONVIERTE.", hint: "Oferta · UX · adquisición" },
      { title: "TOMA DEMASIADO TIEMPO.", hint: "Procesos · automatización" },
      { title: "NO ESCALA.", hint: "Sistemas · datos · IA" },
      { title: "FALTA CLARIDAD.", hint: "Estrategia · experiencia" },
    ],
    proofLabel: "CONTEXTO REAL",
    proofTitle: "ENTORNOS MUY DIFERENTES.",
    proofSectors: ["SALUD", "DEPORTE", "RETAIL", "FINANZAS", "TECH"],
    proofCta: "Ver proyectos",
    doorsLabel: "IR MÁS ALLÁ",
    doors: [
      { title: "ENTENDER EL ENFOQUE", hint: "Servicios", href: "/about" },
      { title: "VER LAS PRUEBAS", hint: "Proyectos", href: "/projects" },
      { title: "HABLAR DEL PROBLEMA", hint: "Contacto", href: "/contact" },
    ],
    finalTitle: "NO NECESITAS LLEGAR CON LA SOLUCIÓN.",
    finalCta: "Hablar del proyecto",
  },
  pt: {
    statement: ["VOCÊ TRAZ O PROBLEMA.", "EU ENCONTRO A ALAVANCA CERTA."],
    situationsLabel: "O QUE ESTÁ TRAVANDO",
    situations: [
      { title: "NÃO CONVERTE.", hint: "Oferta · UX · aquisição" },
      { title: "LEVA TEMPO DEMAIS.", hint: "Processos · automação" },
      { title: "NÃO ESCALA.", hint: "Sistemas · dados · IA" },
      { title: "FALTA CLAREZA.", hint: "Estratégia · experiência" },
    ],
    proofLabel: "CONTEXTO REAL",
    proofTitle: "AMBIENTES MUITO DIFERENTES.",
    proofSectors: ["SAÚDE", "ESPORTE", "VAREJO", "FINANÇAS", "TECH"],
    proofCta: "Ver projetos",
    doorsLabel: "IR ALÉM",
    doors: [
      { title: "ENTENDER A ABORDAGEM", hint: "Serviços", href: "/about" },
      { title: "VER AS PROVAS", hint: "Projetos", href: "/projects" },
      { title: "FALAR DO PROBLEMA", hint: "Contato", href: "/contact" },
    ],
    finalTitle: "VOCÊ NÃO PRECISA CHEGAR COM A SOLUÇÃO.",
    finalCta: "Falar do projeto",
  },
  gcf: {
    statement: ["ZÒT KA VINI ÈVÈ PWOBLÈM-LA.", "MWEN KA CHWAZI BON LÉVYÉ-LA."],
    situationsLabel: "SA KI KA BLOKÉ",
    situations: [
      { title: "I PA KA KONVÈTI.", hint: "Lòf · UX · akizisyon" },
      { title: "I KA PRAN TWÒP TAN.", hint: "Pwosesis · otomatik" },
      { title: "I PA KA GRANDI BYEN.", hint: "Sistèm · data · IA" },
      { title: "I PA ASÉ KLÈ.", hint: "Stratéji · èspéryans" },
    ],
    proofLabel: "TÈREN VRÉ",
    proofTitle: "KONTÈKS KI VRÉMAN DIFÉRAN.",
    proofSectors: ["LASANTÉ", "SPÒ", "KOMÈS", "FINANS", "TECH"],
    proofCta: "Gadé pwojé-la",
    doorsLabel: "ALÉ PLI LWEN",
    doors: [
      { title: "KONPRANN MÉTÒD-LA", hint: "Sèvis", href: "/about" },
      { title: "VWÈ PRÈV-LA", hint: "Pwojé", href: "/projects" },
      { title: "PALÉ DÈ PWOBLÈM-LA", hint: "Kontak", href: "/contact" },
    ],
    finalTitle: "PA BIZWEN VINI ÈVÈ SOLISYON-LA.",
    finalCta: "Palé dè pwojé-la",
  },
  ar: {
    statement: ["أنت تأتي بالمشكلة.", "وأنا أختار الرافعة المناسبة."],
    situationsLabel: "ما الذي يعيق التقدم",
    situations: [
      { title: "لا يحقق التحويل.", hint: "العرض · التجربة · الاكتساب" },
      { title: "يستغرق وقتًا طويلًا.", hint: "العمليات · الأتمتة" },
      { title: "لا يتوسع.", hint: "الأنظمة · البيانات · الذكاء الاصطناعي" },
      { title: "يفتقر إلى الوضوح.", hint: "الاستراتيجية · التجربة" },
    ],
    proofLabel: "سياقات حقيقية",
    proofTitle: "بيئات مختلفة جدًا.",
    proofSectors: ["الصحة", "الرياضة", "التجزئة", "التمويل", "التقنية"],
    proofCta: "عرض المشاريع",
    doorsLabel: "للتعمق أكثر",
    doors: [
      { title: "فهم المنهج", hint: "الخدمات", href: "/about" },
      { title: "رؤية النتائج", hint: "المشاريع", href: "/projects" },
      { title: "مناقشة المشكلة", hint: "تواصل", href: "/contact" },
    ],
    finalTitle: "لا تحتاج إلى الوصول ومعك الحل.",
    finalCta: "تحدث عن مشروعك",
  },
  ja: {
    statement: ["課題を持ってきてください。", "最適なレバーはこちらで選びます。"],
    situationsLabel: "止まっているもの",
    situations: [
      { title: "成果につながらない。", hint: "提案 · UX · 集客" },
      { title: "時間がかかりすぎる。", hint: "業務 · 自動化" },
      { title: "拡張できない。", hint: "システム · データ · AI" },
      { title: "整理されていない。", hint: "戦略 · 体験" },
    ],
    proofLabel: "実際の現場",
    proofTitle: "まったく異なる環境で。",
    proofSectors: ["医療", "スポーツ", "小売", "金融", "TECH"],
    proofCta: "プロジェクトを見る",
    doorsLabel: "さらに見る",
    doors: [
      { title: "アプローチを知る", hint: "サービス", href: "/about" },
      { title: "実績を見る", hint: "プロジェクト", href: "/projects" },
      { title: "課題を相談する", hint: "お問い合わせ", href: "/contact" },
    ],
    finalTitle: "最初から答えを持っている必要はありません。",
    finalCta: "プロジェクトを相談する",
  },
  zh: {
    statement: ["你带着问题来。", "我来找到正确的杠杆。"],
    situationsLabel: "真正卡住的地方",
    situations: [
      { title: "无法转化。", hint: "方案 · UX · 获客" },
      { title: "耗时太长。", hint: "流程 · 自动化" },
      { title: "无法规模化。", hint: "系统 · 数据 · AI" },
      { title: "缺少清晰度。", hint: "战略 · 体验" },
    ],
    proofLabel: "真实场景",
    proofTitle: "完全不同的业务环境。",
    proofSectors: ["医疗", "体育", "零售", "金融", "科技"],
    proofCta: "查看项目",
    doorsLabel: "继续了解",
    doors: [
      { title: "了解方法", hint: "服务", href: "/about" },
      { title: "查看成果", hint: "项目", href: "/projects" },
      { title: "聊聊问题", hint: "联系", href: "/contact" },
    ],
    finalTitle: "你不需要先想好解决方案。",
    finalCta: "聊聊项目",
  },
  ko: {
    statement: ["문제를 가져오세요.", "맞는 레버는 제가 찾습니다."],
    situationsLabel: "막혀 있는 지점",
    situations: [
      { title: "전환이 나오지 않는다.", hint: "오퍼 · UX · 유입" },
      { title: "시간이 너무 오래 걸린다.", hint: "프로세스 · 자동화" },
      { title: "확장되지 않는다.", hint: "시스템 · 데이터 · AI" },
      { title: "명확하지 않다.", hint: "전략 · 경험" },
    ],
    proofLabel: "실제 환경",
    proofTitle: "서로 다른 비즈니스 현장에서.",
    proofSectors: ["의료", "스포츠", "리테일", "금융", "테크"],
    proofCta: "프로젝트 보기",
    doorsLabel: "더 알아보기",
    doors: [
      { title: "접근 방식 이해하기", hint: "서비스", href: "/about" },
      { title: "결과 보기", hint: "프로젝트", href: "/projects" },
      { title: "문제 이야기하기", hint: "문의", href: "/contact" },
    ],
    finalTitle: "처음부터 답을 알고 올 필요는 없습니다.",
    finalCta: "프로젝트 이야기하기",
  },
};

export default function HomeV2({ locale = "fr" }: { locale?: Locale }) {
  const copy = copyByLocale[locale];
  const { startTransition } = usePageTransition();
  const isRtl = locale === "ar";

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    startTransition(href);
  };

  return (
    <>
      <Hero locale={locale} />

      <section dir={isRtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#161616] px-6 py-24 text-white md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border border-white/10 md:h-[420px] md:w-[420px]" />
        <div className="pointer-events-none absolute -right-10 top-24 h-44 w-44 rounded-full border border-[#F44A22]/35 md:h-72 md:w-72" />
        <div className="mx-auto max-w-7xl">
          <p className="font-oswald text-[12vw] font-black uppercase leading-[0.84] tracking-[-0.055em] md:text-[8vw] lg:text-[6.9vw]">{copy.statement[0]}</p>
          <p className="mt-3 max-w-6xl font-oswald text-[12vw] font-black uppercase leading-[0.84] tracking-[-0.055em] text-[#F44A22] md:mt-5 md:text-[8vw] lg:text-[6.9vw]">{copy.statement[1]}</p>
        </div>
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="bg-[#E4E2E3] px-6 py-20 text-[#161616] md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F44A22]">{copy.situationsLabel}</div>
          <div className="grid border-l border-t border-[#161616]/15 sm:grid-cols-2">
            {copy.situations.map((item, index) => (
              <div key={item.title} tabIndex={0} className="group relative min-h-[220px] overflow-hidden border-b border-r border-[#161616]/15 bg-transparent p-6 outline-none transition duration-500 hover:bg-[#161616] focus:bg-[#161616] md:min-h-[280px] md:p-8 lg:min-h-[310px]">
                <div className="absolute right-5 top-4 font-oswald text-sm font-bold text-[#161616]/25 transition group-hover:text-white/25 group-focus:text-white/25">0{index + 1}</div>
                <div className="flex h-full flex-col justify-end">
                  <h2 className="max-w-xl font-oswald text-4xl font-black uppercase leading-[0.92] tracking-[-0.035em] transition duration-500 group-hover:-translate-y-5 group-hover:text-white group-focus:-translate-y-5 group-focus:text-white md:text-5xl lg:text-6xl">{item.title}</h2>
                  <div className="mt-4 translate-y-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F44A22] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">{item.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="overflow-hidden bg-[#F44A22] px-6 py-20 text-[#FEF8E8] md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#161616]/60">{copy.proofLabel}</div>
              <h2 className="max-w-4xl font-oswald text-5xl font-black uppercase leading-[0.9] tracking-[-0.045em] md:text-7xl lg:text-8xl">{copy.proofTitle}</h2>
            </div>
            <Link href={localizedPath(locale, "/projects")} onClick={(event) => navigate(event, localizedPath(locale, "/projects"))} className="inline-flex w-fit items-center gap-3 rounded-full border border-[#161616]/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#161616] transition hover:bg-[#161616] hover:text-white">{copy.proofCta}<ArrowUpRight size={15} /></Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#161616]/25 pt-6 font-oswald text-2xl font-bold uppercase tracking-[-0.02em] text-[#161616]/75 md:gap-x-12 md:text-3xl">
            {copy.proofSectors.map((sector) => <span key={sector}>{sector}</span>)}
          </div>
        </div>
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="bg-[#FEF8E8] px-6 py-20 text-[#161616] md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F44A22]">{copy.doorsLabel}</div>
          <div className="border-t border-[#161616]/15">
            {copy.doors.map((door, index) => {
              const href = localizedPath(locale, door.href);
              return (
                <Link key={door.title} href={href} onClick={(event) => navigate(event, href)} className="group grid items-center gap-4 border-b border-[#161616]/15 py-7 transition md:grid-cols-[64px_1fr_auto] md:py-9">
                  <span className="hidden font-oswald text-sm font-bold text-[#161616]/25 md:block">0{index + 1}</span>
                  <div>
                    <div className="font-oswald text-[9vw] font-black uppercase leading-[0.9] tracking-[-0.045em] transition group-hover:text-[#F44A22] sm:text-5xl md:text-6xl lg:text-7xl">{door.title}</div>
                    <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#161616]/40">{door.hint}</div>
                  </div>
                  <span className="text-3xl transition duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="bg-[#161616] px-6 py-24 text-white md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-5xl font-oswald text-[11vw] font-black uppercase leading-[0.86] tracking-[-0.05em] md:text-[7vw] lg:text-[5.4vw]">{copy.finalTitle}</h2>
          <Link href={localizedPath(locale, "/contact")} onClick={(event) => navigate(event, localizedPath(locale, "/contact"))} className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#F44A22] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#161616]">{copy.finalCta}<ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </>
  );
}
