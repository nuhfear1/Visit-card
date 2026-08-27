"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import { usePageTransition } from "@/components/PageTransition";
import { localizedPath, type Locale } from "@/lib/i18n";

type Copy = {
  statement: [string, string];
  problems: string[];
  problemHints: string[];
  proof: string;
  sectors: string[];
  explore: string;
  doors: Array<{ title: string; label: string; href: "/about" | "/projects" | "/contact" }>;
  final: string;
  cta: string;
};

const copy: Record<Locale, Copy> = {
  fr: {
    statement: ["VOUS VENEZ AVEC UN PROBLÈME.", "JE TROUVE LE BON LEVIER."],
    problems: ["ÇA NE CONVERTIT PAS.", "ÇA PREND TROP DE TEMPS.", "ÇA NE SCALE PAS.", "ÇA MANQUE DE CLARTÉ."],
    problemHints: ["Offre · UX · acquisition", "Process · automatisation", "Système · data · IA", "Stratégie · expérience"],
    proof: "DES CONTEXTES TRÈS DIFFÉRENTS.",
    sectors: ["MÉDICAL", "SPORT", "RETAIL", "FINANCE", "TECH"],
    explore: "Voir les projets",
    doors: [
      { title: "COMPRENDRE L’APPROCHE", label: "Services", href: "/about" },
      { title: "VOIR LES PREUVES", label: "Projets", href: "/projects" },
      { title: "PARLER DU PROBLÈME", label: "Contact", href: "/contact" },
    ],
    final: "PAS BESOIN D’ARRIVER AVEC LA SOLUTION.",
    cta: "Parler du projet",
  },
  en: {
    statement: ["YOU BRING THE PROBLEM.", "I FIND THE RIGHT LEVER."],
    problems: ["IT DOESN’T CONVERT.", "IT TAKES TOO LONG.", "IT WON’T SCALE.", "IT LACKS CLARITY."],
    problemHints: ["Offer · UX · acquisition", "Process · automation", "Systems · data · AI", "Strategy · experience"],
    proof: "VERY DIFFERENT ENVIRONMENTS.",
    sectors: ["HEALTHCARE", "SPORT", "RETAIL", "FINANCE", "TECH"],
    explore: "See the projects",
    doors: [
      { title: "UNDERSTAND THE APPROACH", label: "Services", href: "/about" },
      { title: "SEE THE PROOF", label: "Projects", href: "/projects" },
      { title: "TALK ABOUT THE PROBLEM", label: "Contact", href: "/contact" },
    ],
    final: "YOU DON’T NEED TO ARRIVE WITH THE SOLUTION.",
    cta: "Talk about your project",
  },
  es: {
    statement: ["TÚ TRAES EL PROBLEMA.", "YO ENCUENTRO LA PALANCA CORRECTA."],
    problems: ["NO CONVIERTE.", "TOMA DEMASIADO TIEMPO.", "NO ESCALA.", "FALTA CLARIDAD."],
    problemHints: ["Oferta · UX · adquisición", "Procesos · automatización", "Sistemas · datos · IA", "Estrategia · experiencia"],
    proof: "ENTORNOS MUY DIFERENTES.",
    sectors: ["SALUD", "DEPORTE", "RETAIL", "FINANZAS", "TECH"],
    explore: "Ver proyectos",
    doors: [
      { title: "ENTENDER EL ENFOQUE", label: "Servicios", href: "/about" },
      { title: "VER LAS PRUEBAS", label: "Proyectos", href: "/projects" },
      { title: "HABLAR DEL PROBLEMA", label: "Contacto", href: "/contact" },
    ],
    final: "NO NECESITAS LLEGAR CON LA SOLUCIÓN.",
    cta: "Hablar del proyecto",
  },
  pt: {
    statement: ["VOCÊ TRAZ O PROBLEMA.", "EU ENCONTRO A ALAVANCA CERTA."],
    problems: ["NÃO CONVERTE.", "LEVA TEMPO DEMAIS.", "NÃO ESCALA.", "FALTA CLAREZA."],
    problemHints: ["Oferta · UX · aquisição", "Processos · automação", "Sistemas · dados · IA", "Estratégia · experiência"],
    proof: "AMBIENTES MUITO DIFERENTES.",
    sectors: ["SAÚDE", "ESPORTE", "VAREJO", "FINANÇAS", "TECH"],
    explore: "Ver projetos",
    doors: [
      { title: "ENTENDER A ABORDAGEM", label: "Serviços", href: "/about" },
      { title: "VER AS PROVAS", label: "Projetos", href: "/projects" },
      { title: "FALAR DO PROBLEMA", label: "Contato", href: "/contact" },
    ],
    final: "VOCÊ NÃO PRECISA CHEGAR COM A SOLUÇÃO.",
    cta: "Falar do projeto",
  },
  gcf: {
    statement: ["ZÒT KA VINI ÈVÈ PWOBLÈM-LA.", "MWEN KA CHWAZI BON LÉVYÉ-LA."],
    problems: ["I PA KA KONVÈTI.", "I KA PRAN TWÒP TAN.", "I PA KA GRANDI BYEN.", "I PA ASÉ KLÈ."],
    problemHints: ["Lòf · UX · akizisyon", "Pwosesis · otomatik", "Sistèm · data · IA", "Stratéji · èspéryans"],
    proof: "KONTÈKS KI VRÉMAN DIFÉRAN.",
    sectors: ["LASANTÉ", "SPÒ", "KOMÈS", "FINANS", "TECH"],
    explore: "Gadé pwojé-la",
    doors: [
      { title: "KONPRANN MÉTÒD-LA", label: "Sèvis", href: "/about" },
      { title: "VWÈ PRÈV-LA", label: "Pwojé", href: "/projects" },
      { title: "PALÉ DÈ PWOBLÈM-LA", label: "Kontak", href: "/contact" },
    ],
    final: "PA BIZWEN VINI ÈVÈ SOLISYON-LA.",
    cta: "Palé dè pwojé-la",
  },
  ar: {
    statement: ["أنت تأتي بالمشكلة.", "وأنا أختار الرافعة المناسبة."],
    problems: ["لا يحقق التحويل.", "يستغرق وقتًا طويلًا.", "لا يتوسع.", "يفتقر إلى الوضوح."],
    problemHints: ["العرض · التجربة · الاكتساب", "العمليات · الأتمتة", "الأنظمة · البيانات · الذكاء الاصطناعي", "الاستراتيجية · التجربة"],
    proof: "بيئات مختلفة جدًا.",
    sectors: ["الصحة", "الرياضة", "التجزئة", "التمويل", "التقنية"],
    explore: "عرض المشاريع",
    doors: [
      { title: "فهم المنهج", label: "الخدمات", href: "/about" },
      { title: "رؤية النتائج", label: "المشاريع", href: "/projects" },
      { title: "مناقشة المشكلة", label: "تواصل", href: "/contact" },
    ],
    final: "لا تحتاج إلى الوصول ومعك الحل.",
    cta: "تحدث عن مشروعك",
  },
  ja: {
    statement: ["課題を持ってきてください。", "最適なレバーはこちらで選びます。"],
    problems: ["成果につながらない。", "時間がかかりすぎる。", "拡張できない。", "整理されていない。"],
    problemHints: ["提案 · UX · 集客", "業務 · 自動化", "システム · データ · AI", "戦略 · 体験"],
    proof: "まったく異なる環境で。",
    sectors: ["医療", "スポーツ", "小売", "金融", "TECH"],
    explore: "プロジェクトを見る",
    doors: [
      { title: "アプローチを知る", label: "サービス", href: "/about" },
      { title: "実績を見る", label: "プロジェクト", href: "/projects" },
      { title: "課題を相談する", label: "お問い合わせ", href: "/contact" },
    ],
    final: "最初から答えを持っている必要はありません。",
    cta: "プロジェクトを相談する",
  },
  zh: {
    statement: ["你带着问题来。", "我来找到正确的杠杆。"],
    problems: ["无法转化。", "耗时太长。", "无法规模化。", "缺少清晰度。"],
    problemHints: ["方案 · UX · 获客", "流程 · 自动化", "系统 · 数据 · AI", "战略 · 体验"],
    proof: "完全不同的业务环境。",
    sectors: ["医疗", "体育", "零售", "金融", "科技"],
    explore: "查看项目",
    doors: [
      { title: "了解方法", label: "服务", href: "/about" },
      { title: "查看成果", label: "项目", href: "/projects" },
      { title: "聊聊问题", label: "联系", href: "/contact" },
    ],
    final: "你不需要先想好解决方案。",
    cta: "聊聊项目",
  },
  ko: {
    statement: ["문제를 가져오세요.", "맞는 레버는 제가 찾습니다."],
    problems: ["전환이 나오지 않는다.", "시간이 너무 오래 걸린다.", "확장되지 않는다.", "명확하지 않다."],
    problemHints: ["오퍼 · UX · 유입", "프로세스 · 자동화", "시스템 · 데이터 · AI", "전략 · 경험"],
    proof: "서로 다른 비즈니스 현장에서.",
    sectors: ["의료", "스포츠", "리테일", "금융", "테크"],
    explore: "프로젝트 보기",
    doors: [
      { title: "접근 방식 이해하기", label: "서비스", href: "/about" },
      { title: "결과 보기", label: "프로젝트", href: "/projects" },
      { title: "문제 이야기하기", label: "문의", href: "/contact" },
    ],
    final: "처음부터 답을 알고 올 필요는 없습니다.",
    cta: "프로젝트 이야기하기",
  },
};

export default function HomeV21({ locale = "fr" }: { locale?: Locale }) {
  const c = copy[locale];
  const { startTransition } = usePageTransition();
  const [activeProblem, setActiveProblem] = useState(0);
  const problemRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const isRtl = locale === "ar";

  useEffect(() => {
    const onScroll = () => {
      if (statementRef.current) {
        const rect = statementRef.current.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
        statementRef.current.style.setProperty("--scene-progress", String(p));
      }
      if (problemRef.current) {
        const rect = problemRef.current.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const p = Math.min(0.999, Math.max(0, -rect.top / travel));
        setActiveProblem(Math.min(c.problems.length - 1, Math.floor(p * c.problems.length)));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [c.problems.length]);

  const nav = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    startTransition(href);
  };

  return (
    <>
      <Hero locale={locale} />

      <section ref={statementRef} dir={isRtl ? "rtl" : "ltr"} className="relative min-h-[105vh] overflow-hidden bg-[#E4E2E3] text-[#161616] [--scene-progress:0]">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(22,22,22,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(22,22,22,.08) 1px, transparent 1px)", backgroundSize: "56px 56px", transform: "perspective(900px) rotateX(63deg) scale(1.8) translateY(18%)", transformOrigin: "50% 100%" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38vw] w-[38vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F44A22]/10 blur-3xl" />
        <div className="relative z-10 mx-auto flex min-h-[105vh] max-w-[1500px] flex-col justify-center px-5 py-24 md:px-10 lg:px-16">
          <div className="overflow-hidden">
            <div className="font-oswald text-[13.4vw] font-black uppercase leading-[0.78] tracking-[-0.06em] transition-transform duration-75 md:text-[9.2vw] lg:text-[7.2vw]" style={{ transform: "translateX(calc((var(--scene-progress) - .5) * -3vw))" }}>{c.statement[0]}</div>
          </div>
          <div className="mt-3 overflow-hidden md:mt-5">
            <div className="font-oswald text-[13.4vw] font-black uppercase leading-[0.78] tracking-[-0.06em] text-[#F44A22] transition-transform duration-75 md:text-[9.2vw] lg:text-[7.2vw]" style={{ transform: "translateX(calc((var(--scene-progress) - .5) * 3vw))" }}>{c.statement[1]}</div>
          </div>
          <div className="mt-10 h-px w-full origin-left bg-[#161616]/20" style={{ transform: "scaleX(calc(.2 + var(--scene-progress) * .8))" }} />
        </div>
      </section>

      <section ref={problemRef} dir={isRtl ? "rtl" : "ltr"} className="relative h-[440vh] bg-[#161616] text-white">
        <div className="sticky top-0 flex h-screen overflow-hidden items-center justify-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[64vh] w-[64vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F44A22]/30" />
            <div className="absolute left-1/2 top-1/2 h-[18vh] w-[18vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F44A22]/15 blur-3xl" />
          </div>

          <div className="relative z-10 w-full px-5 md:px-10 lg:px-16">
            {c.problems.map((problem, index) => {
              const active = index === activeProblem;
              const before = index < activeProblem;
              return (
                <div key={problem} className="pointer-events-none absolute left-5 right-5 top-1/2 -translate-y-1/2 md:left-10 md:right-10 lg:left-16 lg:right-16">
                  <div className={`transition-all duration-700 ${active ? "translate-y-0 scale-100 opacity-100" : before ? "-translate-y-24 scale-95 opacity-0" : "translate-y-24 scale-95 opacity-0"}`}>
                    <div className="mb-5 font-oswald text-sm font-bold tracking-[0.22em] text-[#F44A22]">0{index + 1}</div>
                    <h2 className="max-w-[1200px] font-oswald text-[14vw] font-black uppercase leading-[0.8] tracking-[-0.06em] md:text-[10vw] lg:text-[7.8vw]">{problem}</h2>
                    <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 md:text-xs">{c.problemHints[index]}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-8 left-5 right-5 z-20 flex items-center gap-2 md:left-10 md:right-10 lg:left-16 lg:right-16">
            {c.problems.map((_, index) => <span key={index} className={`h-[3px] flex-1 transition-all duration-500 ${index === activeProblem ? "bg-[#F44A22]" : "bg-white/15"}`} />)}
          </div>
        </div>
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#F44A22] text-[#161616]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #161616 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
          <h2 className="max-w-[1200px] font-oswald text-[13vw] font-black uppercase leading-[0.82] tracking-[-0.055em] text-[#FEF8E8] md:text-[9vw] lg:text-[7vw]">{c.proof}</h2>
          <div className="mt-14 overflow-hidden border-y border-[#161616]/25 py-5 md:mt-20">
            <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap font-oswald text-3xl font-black uppercase tracking-[-0.03em] md:gap-16 md:text-5xl">
              {[...c.sectors, ...c.sectors, ...c.sectors].map((sector, index) => <span key={`${sector}-${index}`} className="flex items-center gap-10 md:gap-16"><span>{sector}</span><span className="text-[#FEF8E8]">✦</span></span>)}
            </div>
          </div>
          <Link href={localizedPath(locale, "/projects")} onClick={(e) => nav(e, localizedPath(locale, "/projects"))} className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#161616]/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.17em] transition hover:bg-[#161616] hover:text-white">{c.explore}<ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="bg-[#E4E2E3] text-[#161616]">
        {c.doors.map((door, index) => {
          const href = localizedPath(locale, door.href);
          return (
            <Link key={door.title} href={href} onClick={(e) => nav(e, href)} className="group relative block min-h-[72vh] overflow-hidden border-b border-[#161616]/15 px-5 py-14 md:px-10 lg:px-16">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#161616] transition-transform duration-700 group-hover:scale-y-100" />
              <div className="relative z-10 flex min-h-[60vh] flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[#161616]/45 transition group-hover:text-white/45">
                  <span>0{index + 1}</span><span>{door.label}</span>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <h2 className="max-w-[1200px] font-oswald text-[12.5vw] font-black uppercase leading-[0.8] tracking-[-0.06em] transition-colors duration-500 group-hover:text-white md:text-[8.6vw] lg:text-[6.8vw]">{door.title}</h2>
                  <ArrowUpRight className="mb-2 shrink-0 transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-[#F44A22]" size={38} />
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <section dir={isRtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#161616] px-5 py-28 text-white md:px-10 md:py-36 lg:px-16 lg:py-44">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-[#F44A22]/25" />
        <div className="pointer-events-none absolute -right-10 top-0 h-[300px] w-[300px] rounded-full border border-white/10" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <h2 className="max-w-[1200px] font-oswald text-[12vw] font-black uppercase leading-[0.82] tracking-[-0.055em] md:text-[8vw] lg:text-[6.4vw]">{c.final}</h2>
          <Link href={localizedPath(locale, "/contact")} onClick={(e) => nav(e, localizedPath(locale, "/contact"))} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#F44A22] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition hover:bg-white hover:text-[#161616]">{c.cta}<ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </>
  );
}