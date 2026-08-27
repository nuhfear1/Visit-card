"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import { usePageTransition } from "@/components/PageTransition";
import { localizedPath, type Locale } from "@/lib/i18n";

type Problem = {
  title: string;
  lever: string;
  firstLook: string;
  contexts: string[];
};

type Copy = {
  statement: [string, string];
  eyebrow: string;
  problems: Problem[];
  leverLabel: string;
  firstLookLabel: string;
  contextsLabel: string;
  proofLine: string;
  proofContexts: string[];
  doors: Array<{ title: string; label: string; href: "/about" | "/projects" | "/contact" }>;
};

const copy: Record<Locale, Copy> = {
  fr: {
    statement: ["VOUS VENEZ AVEC UN PROBLÈME.", "JE TROUVE LE BON LEVIER."],
    eyebrow: "QU’EST-CE QUI VOUS BLOQUE ?",
    problems: [
      { title: "ÇA NE CONVERTIT PAS", lever: "Offre · UX · acquisition", firstLook: "Où l’intérêt se perd entre l’arrivée, la compréhension et l’action.", contexts: ["RETAIL", "SERVICES", "ACQUISITION"] },
      { title: "ÇA PREND TROP DE TEMPS", lever: "IA · automatisation · process", firstLook: "Les tâches répétitives, les points de friction et les décisions encore manuelles.", contexts: ["OPÉRATIONS", "IA", "SYSTÈMES MÉTIER"] },
      { title: "ÇA NE SUIT PLUS", lever: "Système · data · architecture", firstLook: "Ce qui casse quand le volume augmente, et ce qui doit être structuré avant de pousser plus loin.", contexts: ["DATA", "SCALE", "AUTOMATISATION"] },
      { title: "ÇA MANQUE DE CLARTÉ", lever: "Stratégie · expérience · priorisation", firstLook: "Le vrai problème à résoudre avant de choisir un outil, un canal ou une technologie.", contexts: ["STRATÉGIE", "PRODUIT", "POSITIONNEMENT"] },
    ],
    leverLabel: "LEVIER PROBABLE",
    firstLookLabel: "JE REGARDERAIS D’ABORD",
    contextsLabel: "CONTEXTES",
    proofLine: "DES PROBLÈMES RÉELS. DES RÉPONSES DIFFÉRENTES.",
    proofContexts: ["MÉDICAL", "SPORT", "RETAIL", "FINANCE", "TECH"],
    doors: [
      { title: "COMPRENDRE L’APPROCHE", label: "Services", href: "/about" },
      { title: "VOIR LES PREUVES", label: "Projets", href: "/projects" },
      { title: "PARLER DU PROBLÈME", label: "Contact", href: "/contact" },
    ],
  },
  en: {
    statement: ["YOU BRING THE PROBLEM.", "I FIND THE RIGHT LEVER."],
    eyebrow: "WHAT IS HOLDING YOU BACK?",
    problems: [
      { title: "IT DOESN’T CONVERT", lever: "Offer · UX · acquisition", firstLook: "Where interest gets lost between arrival, understanding and action.", contexts: ["RETAIL", "SERVICES", "ACQUISITION"] },
      { title: "IT TAKES TOO LONG", lever: "AI · automation · process", firstLook: "Repetitive tasks, friction points and decisions that are still manual.", contexts: ["OPERATIONS", "AI", "BUSINESS SYSTEMS"] },
      { title: "IT WON’T KEEP UP", lever: "Systems · data · architecture", firstLook: "What breaks as volume grows, and what needs structure before scaling further.", contexts: ["DATA", "SCALE", "AUTOMATION"] },
      { title: "IT LACKS CLARITY", lever: "Strategy · experience · prioritization", firstLook: "The real problem to solve before choosing a tool, channel or technology.", contexts: ["STRATEGY", "PRODUCT", "POSITIONING"] },
    ],
    leverLabel: "LIKELY LEVER",
    firstLookLabel: "I’D LOOK AT FIRST",
    contextsLabel: "CONTEXTS",
    proofLine: "REAL PROBLEMS. DIFFERENT RESPONSES.",
    proofContexts: ["HEALTHCARE", "SPORT", "RETAIL", "FINANCE", "TECH"],
    doors: [
      { title: "UNDERSTAND THE APPROACH", label: "Services", href: "/about" },
      { title: "SEE THE PROOF", label: "Projects", href: "/projects" },
      { title: "TALK ABOUT THE PROBLEM", label: "Contact", href: "/contact" },
    ],
  },
  es: {
    statement: ["TÚ TRAES EL PROBLEMA.", "YO ENCUENTRO LA PALANCA CORRECTA."],
    eyebrow: "¿QUÉ TE ESTÁ FRENANDO?",
    problems: [
      { title: "NO CONVIERTE", lever: "Oferta · UX · adquisición", firstLook: "Dónde se pierde el interés entre la llegada, la comprensión y la acción.", contexts: ["RETAIL", "SERVICIOS", "ADQUISICIÓN"] },
      { title: "TOMA DEMASIADO TIEMPO", lever: "IA · automatización · procesos", firstLook: "Tareas repetitivas, fricciones y decisiones que todavía siguen siendo manuales.", contexts: ["OPERACIONES", "IA", "SISTEMAS"] },
      { title: "YA NO AGUANTA EL RITMO", lever: "Sistemas · datos · arquitectura", firstLook: "Qué se rompe cuando aumenta el volumen y qué hay que estructurar antes de escalar.", contexts: ["DATOS", "ESCALA", "AUTOMATIZACIÓN"] },
      { title: "FALTA CLARIDAD", lever: "Estrategia · experiencia · prioridades", firstLook: "El problema real que hay que resolver antes de elegir herramienta, canal o tecnología.", contexts: ["ESTRATEGIA", "PRODUCTO", "POSICIONAMIENTO"] },
    ],
    leverLabel: "PALANCA PROBABLE",
    firstLookLabel: "MIRARÍA PRIMERO",
    contextsLabel: "CONTEXTOS",
    proofLine: "PROBLEMAS REALES. RESPUESTAS DIFERENTES.",
    proofContexts: ["SALUD", "DEPORTE", "RETAIL", "FINANZAS", "TECH"],
    doors: [
      { title: "ENTENDER EL ENFOQUE", label: "Servicios", href: "/about" },
      { title: "VER LAS PRUEBAS", label: "Proyectos", href: "/projects" },
      { title: "HABLAR DEL PROBLEMA", label: "Contacto", href: "/contact" },
    ],
  },
  pt: {
    statement: ["VOCÊ TRAZ O PROBLEMA.", "EU ENCONTRO A ALAVANCA CERTA."], eyebrow: "O QUE ESTÁ TE TRAVANDO?", leverLabel: "ALAVANCA PROVÁVEL", firstLookLabel: "EU OLHARIA PRIMEIRO", contextsLabel: "CONTEXTOS", proofLine: "PROBLEMAS REAIS. RESPOSTAS DIFERENTES.", proofContexts: ["SAÚDE", "ESPORTE", "VAREJO", "FINANÇAS", "TECH"],
    problems: [
      { title: "NÃO CONVERTE", lever: "Oferta · UX · aquisição", firstLook: "Onde o interesse se perde entre a chegada, o entendimento e a ação.", contexts: ["VAREJO", "SERVIÇOS", "AQUISIÇÃO"] },
      { title: "LEVA TEMPO DEMAIS", lever: "IA · automação · processo", firstLook: "Tarefas repetitivas, atritos e decisões que ainda são manuais.", contexts: ["OPERAÇÕES", "IA", "SISTEMAS"] },
      { title: "NÃO ACOMPANHA MAIS", lever: "Sistemas · dados · arquitetura", firstLook: "O que quebra quando o volume cresce e o que precisa ser estruturado antes de escalar.", contexts: ["DADOS", "ESCALA", "AUTOMAÇÃO"] },
      { title: "FALTA CLAREZA", lever: "Estratégia · experiência · priorização", firstLook: "O problema real a resolver antes de escolher ferramenta, canal ou tecnologia.", contexts: ["ESTRATÉGIA", "PRODUTO", "POSICIONAMENTO"] },
    ],
    doors: [
      { title: "ENTENDER A ABORDAGEM", label: "Serviços", href: "/about" },
      { title: "VER AS PROVAS", label: "Projetos", href: "/projects" },
      { title: "FALAR DO PROBLEMA", label: "Contato", href: "/contact" },
    ],
  },
  gcf: {
    statement: ["ZÒT KA VINI ÈVÈ PWOBLÈM-LA.", "MWEN KA CHWAZI BON LÉVYÉ-LA."], eyebrow: "KA KI KA BLOKÉ ZÒT?", leverLabel: "LÉVYÉ KI KA SANM BON", firstLookLabel: "SA MWEN TÉ KÉ GADÉ AN PRÈMYÉ", contextsLabel: "KONTÈKS", proofLine: "PWOBLÈM VRÉ. RÉPONS KI DIFÉRAN.", proofContexts: ["LASANTÉ", "SPÒ", "KOMÈS", "FINANS", "TECH"],
    problems: [
      { title: "I PA KA KONVÈTI", lever: "Lòf · UX · akizisyon", firstLook: "Koté entérè ka pèd ant rivé, konprann é aji.", contexts: ["KOMÈS", "SÈVIS", "AKIZISYON"] },
      { title: "I KA PRAN TWÒP TAN", lever: "IA · otomatik · pwosesis", firstLook: "Travay répétitif, friksyon é désizyon ki toujou ka fèt alamen.", contexts: ["OPÉRASYON", "IA", "SISTÈM"] },
      { title: "I PA KA SUIV ANKÒ", lever: "Sistèm · data · achitektir", firstLook: "Sa ki ka kasé lè volim-la ka monté é sa pou òganizé avan grandi ankò.", contexts: ["DATA", "GRANDISMAN", "OTOMATIK"] },
      { title: "I PA ASÉ KLÈ", lever: "Stratéji · èspéryans · priyorité", firstLook: "Vrè pwoblèm-la pou réglé avan chwazi zouti, kanal oben teknoloji.", contexts: ["STRATÉJI", "PWODUI", "POZISYONMAN"] },
    ],
    doors: [
      { title: "KONPRANN MÉTÒD-LA", label: "Sèvis", href: "/about" },
      { title: "VWÈ PRÈV-LA", label: "Pwojé", href: "/projects" },
      { title: "PALÉ DÈ PWOBLÈM-LA", label: "Kontak", href: "/contact" },
    ],
  },
  ar: {
    statement: ["أنت تأتي بالمشكلة.", "وأنا أختار الرافعة المناسبة."], eyebrow: "ما الذي يعيق التقدم؟", leverLabel: "الرافعة المرجحة", firstLookLabel: "سأبدأ بالنظر إلى", contextsLabel: "السياقات", proofLine: "مشكلات حقيقية. استجابات مختلفة.", proofContexts: ["الصحة", "الرياضة", "التجزئة", "التمويل", "التقنية"],
    problems: [
      { title: "لا يحقق التحويل", lever: "العرض · التجربة · الاكتساب", firstLook: "أين يضيع الاهتمام بين الوصول والفهم واتخاذ الخطوة.", contexts: ["التجزئة", "الخدمات", "الاكتساب"] },
      { title: "يستغرق وقتًا طويلًا", lever: "الذكاء الاصطناعي · الأتمتة · العمليات", firstLook: "المهام المتكررة ونقاط الاحتكاك والقرارات التي ما زالت يدوية.", contexts: ["العمليات", "الذكاء الاصطناعي", "الأنظمة"] },
      { title: "لم يعد يواكب النمو", lever: "الأنظمة · البيانات · البنية", firstLook: "ما الذي يتعطل مع زيادة الحجم وما الذي يجب تنظيمه قبل التوسع أكثر.", contexts: ["البيانات", "التوسع", "الأتمتة"] },
      { title: "يفتقر إلى الوضوح", lever: "الاستراتيجية · التجربة · الأولويات", firstLook: "المشكلة الحقيقية قبل اختيار أداة أو قناة أو تقنية.", contexts: ["الاستراتيجية", "المنتج", "التموضع"] },
    ],
    doors: [
      { title: "فهم المنهج", label: "الخدمات", href: "/about" },
      { title: "رؤية النتائج", label: "المشاريع", href: "/projects" },
      { title: "مناقشة المشكلة", label: "تواصل", href: "/contact" },
    ],
  },
  ja: {
    statement: ["課題を持ってきてください。", "最適なレバーはこちらで選びます。"], eyebrow: "何が止めていますか？", leverLabel: "有力なレバー", firstLookLabel: "まず見るポイント", contextsLabel: "文脈", proofLine: "現実の課題。異なる答え。", proofContexts: ["医療", "スポーツ", "小売", "金融", "TECH"],
    problems: [
      { title: "成果につながらない", lever: "提案 · UX · 集客", firstLook: "到達、理解、行動のどこで関心が失われているか。", contexts: ["小売", "サービス", "集客"] },
      { title: "時間がかかりすぎる", lever: "AI · 自動化 · 業務", firstLook: "反復作業、摩擦、まだ手作業の意思決定。", contexts: ["業務", "AI", "システム"] },
      { title: "成長についていけない", lever: "システム · データ · 設計", firstLook: "量が増えた時に壊れる部分と、拡張前に整えるべき部分。", contexts: ["データ", "拡張", "自動化"] },
      { title: "整理されていない", lever: "戦略 · 体験 · 優先順位", firstLook: "ツールやチャネルを選ぶ前に解くべき本当の課題。", contexts: ["戦略", "プロダクト", "ポジショニング"] },
    ],
    doors: [
      { title: "アプローチを知る", label: "サービス", href: "/about" },
      { title: "実績を見る", label: "プロジェクト", href: "/projects" },
      { title: "課題を相談する", label: "お問い合わせ", href: "/contact" },
    ],
  },
  zh: {
    statement: ["你带着问题来。", "我来找到正确的杠杆。"], eyebrow: "真正卡住你的是什么？", leverLabel: "可能的杠杆", firstLookLabel: "我会先看", contextsLabel: "场景", proofLine: "真实问题。不同答案。", proofContexts: ["医疗", "体育", "零售", "金融", "科技"],
    problems: [
      { title: "无法转化", lever: "方案 · UX · 获客", firstLook: "兴趣在到达、理解和行动之间的哪个环节流失。", contexts: ["零售", "服务", "获客"] },
      { title: "耗时太长", lever: "AI · 自动化 · 流程", firstLook: "重复任务、摩擦点，以及仍然依赖人工的决策。", contexts: ["运营", "AI", "业务系统"] },
      { title: "已经跟不上增长", lever: "系统 · 数据 · 架构", firstLook: "规模上升后哪里开始失效，以及扩张前必须先结构化什么。", contexts: ["数据", "扩张", "自动化"] },
      { title: "缺少清晰度", lever: "战略 · 体验 · 优先级", firstLook: "在选择工具、渠道或技术前，真正需要解决的问题是什么。", contexts: ["战略", "产品", "定位"] },
    ],
    doors: [
      { title: "了解方法", label: "服务", href: "/about" },
      { title: "查看成果", label: "项目", href: "/projects" },
      { title: "聊聊问题", label: "联系", href: "/contact" },
    ],
  },
  ko: {
    statement: ["문제를 가져오세요.", "맞는 레버는 제가 찾습니다."], eyebrow: "무엇이 막고 있나요?", leverLabel: "가능성이 높은 레버", firstLookLabel: "먼저 볼 지점", contextsLabel: "맥락", proofLine: "현실의 문제. 서로 다른 답.", proofContexts: ["의료", "스포츠", "리테일", "금융", "테크"],
    problems: [
      { title: "전환이 나오지 않는다", lever: "오퍼 · UX · 유입", firstLook: "유입, 이해, 행동 사이 어디에서 관심이 빠지는지.", contexts: ["리테일", "서비스", "유입"] },
      { title: "시간이 너무 오래 걸린다", lever: "AI · 자동화 · 프로세스", firstLook: "반복 업무, 마찰 지점, 아직 수작업인 의사결정.", contexts: ["운영", "AI", "시스템"] },
      { title: "성장을 따라가지 못한다", lever: "시스템 · 데이터 · 아키텍처", firstLook: "볼륨이 늘 때 무엇이 깨지고, 확장 전에 무엇을 구조화해야 하는지.", contexts: ["데이터", "확장", "자동화"] },
      { title: "명확하지 않다", lever: "전략 · 경험 · 우선순위", firstLook: "도구나 채널을 고르기 전에 먼저 풀어야 할 진짜 문제.", contexts: ["전략", "제품", "포지셔닝"] },
    ],
    doors: [
      { title: "접근 방식 이해하기", label: "서비스", href: "/about" },
      { title: "결과 보기", label: "프로젝트", href: "/projects" },
      { title: "문제 이야기하기", label: "문의", href: "/contact" },
    ],
  },
};

export default function HomeAllInOne({ locale = "fr" }: { locale?: Locale }) {
  const c = copy[locale];
  const [active, setActive] = useState(0);
  const { startTransition } = usePageTransition();
  const isRtl = locale === "ar";
  const selected = c.problems[active];

  const nav = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    startTransition(href);
  };

  return (
    <>
      <Hero locale={locale} />
      <section dir={isRtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-[#E4E2E3] px-5 py-16 text-[#161616] md:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(rgba(22,22,22,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(22,22,22,.07) 1px, transparent 1px)", backgroundSize: "44px 44px", transform: "perspective(900px) rotateX(60deg) scale(1.65) translateY(16%)", transformOrigin: "50% 100%" }} />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-3 border-b border-[#161616]/15 pb-8 md:pb-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F44A22]">{c.eyebrow}</div>
            <h1 className="font-oswald text-[11vw] font-black uppercase leading-[0.84] tracking-[-0.055em] md:text-[7.6vw] lg:text-[5.8vw]">
              <span className="block">{c.statement[0]}</span>
              <span className="block text-[#F44A22]">{c.statement[1]}</span>
            </h1>
          </div>

          <div className="grid gap-0 border-b border-[#161616]/15 lg:grid-cols-[0.95fr_1.35fr]">
            <div className="border-[#161616]/15 lg:border-r">
              {c.problems.map((problem, index) => {
                const isActive = index === active;
                return (
                  <button key={problem.title} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} className={`group flex w-full items-center justify-between border-b border-[#161616]/15 px-0 py-5 text-left transition last:border-b-0 md:py-6 ${isActive ? "text-[#F44A22]" : "text-[#161616] hover:text-[#F44A22]"}`}>
                    <span className="flex items-center gap-4">
                      <span className="font-oswald text-xs font-bold text-[#161616]/25">0{index + 1}</span>
                      <span className="font-oswald text-[7vw] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[3.1vw]">{problem.title}</span>
                    </span>
                    <span className={`text-2xl transition-transform ${isActive ? "rotate-45" : "group-hover:rotate-45"}`}>↗</span>
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[500px] overflow-hidden px-0 py-8 md:min-h-[560px] md:py-10 lg:px-10 lg:py-12">
              <div className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-[#F44A22]/20" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#161616]/40">{c.leverLabel}</div>
                  <div className="mt-3 max-w-3xl font-oswald text-4xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-[#F44A22] md:text-6xl lg:text-7xl">{selected.lever}</div>
                </div>
                <div className="max-w-3xl">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#161616]/40">{c.firstLookLabel}</div>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[#161616]/75 md:text-lg">{selected.firstLook}</p>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#161616]/40">{c.contextsLabel}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.contexts.map((item) => <span key={item} className="rounded-full border border-[#161616]/15 bg-white/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em]">{item}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-b border-[#161616]/15 py-8 md:py-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="max-w-4xl font-oswald text-[9vw] font-black uppercase leading-[0.86] tracking-[-0.05em] md:text-[6vw] lg:text-[4.3vw]">{c.proofLine}</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {c.proofContexts.map((item) => <span key={item} className="font-oswald text-xl font-bold uppercase text-[#161616]/45 md:text-2xl">{item}</span>)}
            </div>
          </div>

          <div className="grid md:grid-cols-3">
            {c.doors.map((door, index) => {
              const href = localizedPath(locale, door.href);
              return (
                <Link key={door.title} href={href} onClick={(e) => nav(e, href)} className="group relative overflow-hidden border-b border-[#161616]/15 py-7 md:border-b-0 md:border-r md:px-6 md:last:border-r-0 lg:py-9">
                  <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#161616] transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#161616]/35 transition group-hover:text-white/35">0{index + 1} · {door.label}</div>
                      <div className="mt-2 font-oswald text-3xl font-black uppercase leading-[0.92] tracking-[-0.035em] transition group-hover:text-white md:text-4xl lg:text-5xl">{door.title}</div>
                    </div>
                    <ArrowUpRight className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#F44A22]" size={24} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
