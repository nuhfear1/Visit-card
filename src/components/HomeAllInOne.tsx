"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import { usePageTransition } from "@/components/PageTransition";
import { localizedPath, type Locale } from "@/lib/i18n";
import { PROJECT_PROBLEM_KEYS, rememberProjectProblem } from "@/lib/funnel";

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
  contactPrompt: string;
  contactCta: string;
  proofLine: string;
  proofContexts: string[];
  doors: Array<{ title: string; label: string; href: "/about" | "/projects" | "/contact" }>;
};

const copy: Record<Locale, Copy> = {
  fr: {
    statement: ["VOUS VENEZ AVEC UN PROBLÈME.", "JE TROUVE OÙ AGIR."],
    eyebrow: "QU’EST-CE QUI VOUS BLOQUE ?",
    problems: [
      { title: "LES VISITEURS N’AGISSENT PAS", lever: "SITE WEB · PARCOURS · CONVERSION", firstLook: "Je regarde ce que vos visiteurs comprennent, où ils hésitent et ce qui les empêche de passer à l’action.", contexts: ["UX", "CRO", "ACQUISITION"] },
      { title: "ÇA PREND TROP DE TEMPS", lever: "IA · AUTOMATISATION", firstLook: "Je repère les tâches répétitives et les étapes qui peuvent être simplifiées ou automatisées.", contexts: ["AGENTS IA", "PROCESS", "INTÉGRATIONS"] },
      { title: "LES OUTILS NE SUIVENT PLUS", lever: "DONNÉES · AUTOMATISATION · CONNEXIONS", firstLook: "Je regarde ce qui ne communique plus, ce qui casse avec le volume et ce qu’il faut reconnecter.", contexts: ["DATA", "SYSTÈMES", "OPÉRATIONS"] },
      { title: "JE NE SAIS PAS QUOI PRIORISER", lever: "STRATÉGIE · CROISSANCE · PRIORITÉS", firstLook: "Je clarifie le vrai problème, ce qui compte maintenant et la prochaine décision utile.", contexts: ["STRATÉGIE", "POSITIONNEMENT", "CROISSANCE"] },
    ],
    leverLabel: "CE QUE J’UTILISE",
    firstLookLabel: "CE QUE JE REGARDE EN PREMIER",
    contextsLabel: "COMPÉTENCES",
    contactPrompt: "Vous vous reconnaissez ? Dites-moi simplement ce qui bloque et ce que vous voulez obtenir.",
    contactCta: "ME DIRE CE QUI BLOQUE",
    proofLine: "DES PROBLÈMES CONCRETS. DES SOLUTIONS CHOISIES POUR ÊTRE UTILES.",
    proofContexts: ["MÉDICAL", "SPORT", "COMMERCE", "FINANCE", "TECH"],
    doors: [
      { title: "VOIR COMMENT J’INTERVIENS", label: "Services", href: "/about" },
      { title: "VOIR LES RÉSULTATS", label: "Projets", href: "/projects" },
      { title: "ME DIRE CE QUI BLOQUE", label: "Contact", href: "/contact" },
    ],
  },
  en: {
    statement: ["YOU BRING THE PROBLEM.", "I FIND WHERE TO ACT."],
    eyebrow: "WHAT’S GETTING IN THE WAY?",
    problems: [
      { title: "VISITORS DON’T TAKE ACTION", lever: "WEBSITE · JOURNEY · CONVERSION", firstLook: "I look at what visitors understand, where they hesitate, and what stops them from taking the next step.", contexts: ["UX", "CRO", "ACQUISITION"] },
      { title: "IT TAKES TOO LONG", lever: "AI · AUTOMATION", firstLook: "I find repetitive work and steps that can be simplified or automated.", contexts: ["AI AGENTS", "PROCESS", "INTEGRATIONS"] },
      { title: "THE TOOLS CAN’T KEEP UP", lever: "DATA · AUTOMATION · CONNECTIONS", firstLook: "I look at what no longer connects, what breaks as volume grows, and what needs to work together again.", contexts: ["DATA", "SYSTEMS", "OPERATIONS"] },
      { title: "I DON’T KNOW WHAT TO PRIORITIZE", lever: "STRATEGY · GROWTH · PRIORITIES", firstLook: "I clarify the real problem, what matters now, and the next useful decision.", contexts: ["STRATEGY", "POSITIONING", "GROWTH"] },
    ],
    leverLabel: "WHAT I USE",
    firstLookLabel: "WHAT I LOOK AT FIRST",
    contextsLabel: "SKILLS",
    contactPrompt: "See your situation here? Tell me what’s stuck and what you want to achieve.",
    contactCta: "TELL ME WHAT’S STUCK",
    proofLine: "REAL PROBLEMS. SOLUTIONS CHOSEN TO BE USEFUL.",
    proofContexts: ["HEALTHCARE", "SPORT", "RETAIL", "FINANCE", "TECH"],
    doors: [
      { title: "SEE HOW I CAN HELP", label: "Services", href: "/about" },
      { title: "SEE THE RESULTS", label: "Projects", href: "/projects" },
      { title: "TELL ME WHAT’S STUCK", label: "Contact", href: "/contact" },
    ],
  },
  es: {
    statement: ["TÚ TRAES EL PROBLEMA.", "YO ENCUENTRO DÓNDE ACTUAR."],
    eyebrow: "¿QUÉ TE ESTÁ FRENANDO?",
    problems: [
      { title: "LOS VISITANTES NO ACTÚAN", lever: "WEB · RECORRIDO · CONVERSIÓN", firstLook: "Reviso qué entienden tus visitantes, dónde dudan y qué les impide dar el siguiente paso.", contexts: ["UX", "CRO", "ADQUISICIÓN"] },
      { title: "TOMA DEMASIADO TIEMPO", lever: "IA · AUTOMATIZACIÓN", firstLook: "Detecto tareas repetitivas y pasos que se pueden simplificar o automatizar.", contexts: ["AGENTES IA", "PROCESOS", "INTEGRACIONES"] },
      { title: "LAS HERRAMIENTAS YA NO DAN ABASTO", lever: "DATOS · AUTOMATIZACIÓN · CONEXIONES", firstLook: "Reviso qué dejó de conectarse, qué falla al crecer y qué debe volver a trabajar en conjunto.", contexts: ["DATOS", "SISTEMAS", "OPERACIONES"] },
      { title: "NO SÉ QUÉ PRIORIZAR", lever: "ESTRATEGIA · CRECIMIENTO · PRIORIDADES", firstLook: "Aclaro el problema real, qué importa ahora y cuál es la próxima decisión útil.", contexts: ["ESTRATEGIA", "POSICIONAMIENTO", "CRECIMIENTO"] },
    ],
    leverLabel: "LO QUE UTILIZO",
    firstLookLabel: "LO QUE REVISO PRIMERO",
    contextsLabel: "CAPACIDADES",
    contactPrompt: "¿Te identificas con esto? Cuéntame qué te frena y qué quieres conseguir.",
    contactCta: "CUÉNTAME QUÉ TE FRENA",
    proofLine: "PROBLEMAS REALES. SOLUCIONES ELEGIDAS PARA SER ÚTILES.",
    proofContexts: ["SALUD", "DEPORTE", "COMERCIO", "FINANZAS", "TECH"],
    doors: [
      { title: "VER CÓMO PUEDO AYUDAR", label: "Servicios", href: "/about" },
      { title: "VER LOS RESULTADOS", label: "Proyectos", href: "/projects" },
      { title: "CUÉNTAME QUÉ TE FRENA", label: "Contacto", href: "/contact" },
    ],
  },
  pt: {
    statement: ["VOCÊ TRAZ O PROBLEMA.", "EU ENCONTRO ONDE AGIR."],
    eyebrow: "O QUE ESTÁ TE TRAVANDO?",
    problems: [
      { title: "AS PESSOAS NÃO AVANÇAM", lever: "SITE · JORNADA · CONVERSÃO", firstLook: "Eu vejo o que as pessoas entendem, onde elas hesitam e o que impede o próximo passo.", contexts: ["UX", "CRO", "AQUISIÇÃO"] },
      { title: "LEVA TEMPO DEMAIS", lever: "IA · AUTOMAÇÃO", firstLook: "Eu identifico tarefas repetitivas e etapas que podem ser simplificadas ou automatizadas.", contexts: ["AGENTES DE IA", "PROCESSOS", "INTEGRAÇÕES"] },
      { title: "AS FERRAMENTAS NÃO ACOMPANHAM", lever: "DADOS · AUTOMAÇÃO · CONEXÕES", firstLook: "Eu vejo o que deixou de se conectar, o que quebra com o crescimento e o que precisa voltar a funcionar junto.", contexts: ["DADOS", "SISTEMAS", "OPERAÇÕES"] },
      { title: "NÃO SEI O QUE PRIORIZAR", lever: "ESTRATÉGIA · CRESCIMENTO · PRIORIDADES", firstLook: "Eu esclareço o problema real, o que importa agora e qual é a próxima decisão útil.", contexts: ["ESTRATÉGIA", "POSICIONAMENTO", "CRESCIMENTO"] },
    ],
    leverLabel: "O QUE EU USO",
    firstLookLabel: "O QUE EU VEJO PRIMEIRO",
    contextsLabel: "COMPETÊNCIAS",
    contactPrompt: "Se você se reconhece aqui, me conte o que está travando e onde quer chegar.",
    contactCta: "ME CONTE O QUE ESTÁ TRAVANDO",
    proofLine: "PROBLEMAS REAIS. SOLUÇÕES ESCOLHIDAS PARA SEREM ÚTEIS.",
    proofContexts: ["SAÚDE", "ESPORTE", "VAREJO", "FINANÇAS", "TECH"],
    doors: [
      { title: "VER COMO POSSO AJUDAR", label: "Serviços", href: "/about" },
      { title: "VER OS RESULTADOS", label: "Projetos", href: "/projects" },
      { title: "ME CONTE O QUE ESTÁ TRAVANDO", label: "Contato", href: "/contact" },
    ],
  },
  gcf: {
    statement: ["ZÒT KA VINI ÈVÈ PWOBLÈM-LA.", "MWEN KA TOUVÉ KOTÉ POU AJI."],
    eyebrow: "KA KI KA BLOKÉ ZÒT?",
    problems: [
      { title: "MOUN-LA PA KA PASÉ A AKSYON", lever: "SIT WEB · CHIMEN · KONVÈSYON", firstLook: "Mwen ka gadé sa moun-la ka konprann, koté i ka douté é sa ki ka anpéché-y kontinyé.", contexts: ["UX", "CRO", "AKIZISYON"] },
      { title: "I KA PRAN TWÒP TAN", lever: "IA · OTOMATIZASYON", firstLook: "Mwen ka chèché travay ki ka répété é étap nou pé fè pli senp oben otomatik.", contexts: ["AJAN IA", "PWOSÉSIS", "ENTÉGRASYON"] },
      { title: "ZOUTI-LA PA KA SUIV ANKÒ", lever: "DATA · OTOMATIZASYON · KONEKSYON", firstLook: "Mwen ka gadé sa ki pa konekté ankò, sa ki ka kasé lè travay-la ka monté é sa pou rekonekté.", contexts: ["DATA", "SISTÈM", "OPÉRASYON"] },
      { title: "MWEN PA SAV SA POU FÈ AN PRÈMYÉ", lever: "STRATÉJI · KWASANS · PRIYORITÉ", firstLook: "Mwen ka mété pwoblèm-la klè, chwazi sa ki pi enpòtan é pwochen bon désizyon-la.", contexts: ["STRATÉJI", "POZISYONMAN", "KWASANS"] },
    ],
    leverLabel: "SA MWEN KA SÈVI",
    firstLookLabel: "SA MWEN KA GADÉ AN PRÈMYÉ",
    contextsLabel: "KONPÉTANS",
    contactPrompt: "Si zòt ka rèkonnèt zòt adan sa, di mwen sa ki ka bloké é koté zòt vlé rivé.",
    contactCta: "DI MWEN SA KI KA BLOKÉ",
    proofLine: "PWOBLÈM VRÉ. SOLISYON CHWAZI POU YO SÈVI VRÉMAN.",
    proofContexts: ["LASANTÉ", "SPÒ", "KOMÈS", "FINANS", "TECH"],
    doors: [
      { title: "VWÈ KIJAN MWEN PÉ ÉDÉ", label: "Sèvis", href: "/about" },
      { title: "VWÈ RÉZILTA-LA", label: "Pwojé", href: "/projects" },
      { title: "DI MWEN SA KI KA BLOKÉ", label: "Kontak", href: "/contact" },
    ],
  },
  ar: {
    statement: ["تأتي بالمشكلة.", "وأحدد أين نبدأ."],
    eyebrow: "ما الذي يعيقك؟",
    problems: [
      { title: "الزوار لا يتخذون خطوة", lever: "الموقع · تجربة الاستخدام · التحويل", firstLook: "أراجع ما يفهمه الزائر، وأين يتردد، وما الذي يمنعه من اتخاذ الخطوة التالية.", contexts: ["تجربة المستخدم", "تحسين التحويل", "الاكتساب"] },
      { title: "العمل يستغرق وقتًا طويلًا", lever: "الذكاء الاصطناعي · الأتمتة", firstLook: "أحدد المهام المتكررة والخطوات التي يمكن تبسيطها أو أتمتتها.", contexts: ["وكلاء الذكاء الاصطناعي", "العمليات", "التكاملات"] },
      { title: "الأدوات لم تعد تواكب", lever: "البيانات · الأتمتة · الربط", firstLook: "أراجع ما لم يعد متصلًا، وما يتعطل مع زيادة العمل، وما يجب ربطه من جديد.", contexts: ["البيانات", "الأنظمة", "العمليات"] },
      { title: "الأولويات غير واضحة", lever: "الاستراتيجية · النمو · الأولويات", firstLook: "أوضح المشكلة الحقيقية، وما هو الأهم الآن، وما القرار التالي المفيد.", contexts: ["الاستراتيجية", "التموضع", "النمو"] },
    ],
    leverLabel: "ما أستخدمه",
    firstLookLabel: "ما أراجعه أولًا",
    contextsLabel: "المهارات",
    contactPrompt: "إذا كان هذا يشبه وضعك، أخبرني ما الذي يعيقك وما الذي تريد الوصول إليه.",
    contactCta: "أخبرني ما الذي يعيقك",
    proofLine: "مشكلات حقيقية. حلول عملية تناسب الحاجة.",
    proofContexts: ["الصحة", "الرياضة", "التجارة", "التمويل", "التقنية"],
    doors: [
      { title: "كيف يمكنني المساعدة", label: "الخدمات", href: "/about" },
      { title: "عرض النتائج", label: "المشاريع", href: "/projects" },
      { title: "أخبرني ما الذي يعيقك", label: "تواصل", href: "/contact" },
    ],
  },
  ja: {
    statement: ["課題を教えてください。", "まず見るべき場所を決めます。"],
    eyebrow: "何が止めていますか？",
    problems: [
      { title: "訪問者が行動しない", lever: "WEB · 導線 · コンバージョン", firstLook: "何が伝わっているか、どこで迷うか、次の行動を止めているものは何かを見ます。", contexts: ["UX", "CRO", "集客"] },
      { title: "時間がかかりすぎる", lever: "AI · 自動化", firstLook: "繰り返し作業と、自動化や簡略化ができる工程を探します。", contexts: ["AIエージェント", "業務", "連携"] },
      { title: "ツールが追いつかない", lever: "データ · 自動化 · 連携", firstLook: "つながっていない部分、量が増えると止まる部分、つなぎ直すべき部分を見ます。", contexts: ["データ", "システム", "業務"] },
      { title: "何を優先すべきか分からない", lever: "戦略 · 成長 · 優先順位", firstLook: "本当の課題、今いちばん大事なこと、次に決めるべきことを整理します。", contexts: ["戦略", "ポジショニング", "成長"] },
    ],
    leverLabel: "使う手段",
    firstLookLabel: "最初に見ること",
    contextsLabel: "専門領域",
    contactPrompt: "当てはまるものがあれば、困っていることと目標を教えてください。",
    contactCta: "課題を相談する",
    proofLine: "現実の課題に、必要な解決策を。",
    proofContexts: ["医療", "スポーツ", "小売", "金融", "TECH"],
    doors: [
      { title: "できることを見る", label: "サービス", href: "/about" },
      { title: "実績を見る", label: "プロジェクト", href: "/projects" },
      { title: "課題を相談する", label: "お問い合わせ", href: "/contact" },
    ],
  },
  zh: {
    statement: ["你带着问题来。", "我先找到该从哪里解决。"],
    eyebrow: "哪里卡住了？",
    problems: [
      { title: "访客没有行动", lever: "网站 · 用户体验 · 转化", firstLook: "我先看访客看懂了什么、在哪里犹豫，以及什么阻止了下一步行动。", contexts: ["UX", "CRO", "获客"] },
      { title: "太耗时间", lever: "AI · 自动化", firstLook: "我会找出重复工作，以及可以简化或自动化的步骤。", contexts: ["AI智能体", "流程", "集成"] },
      { title: "工具跟不上了", lever: "数据 · 自动化 · 连接", firstLook: "我会看哪些工具没有连起来、哪里随着业务增长开始出问题，以及哪里需要重新连接。", contexts: ["数据", "系统", "运营"] },
      { title: "不知道先做什么", lever: "战略 · 增长 · 优先级", firstLook: "我会先把真正的问题、现在最重要的事和下一步要做的决定理清。", contexts: ["战略", "定位", "增长"] },
    ],
    leverLabel: "我会用什么",
    firstLookLabel: "我先看什么",
    contextsLabel: "能力",
    contactPrompt: "如果你也遇到类似情况，告诉我哪里卡住了，以及你想达到什么目标。",
    contactCta: "告诉我哪里卡住了",
    proofLine: "真实问题。选择真正有用的解决方案。",
    proofContexts: ["医疗", "体育", "零售", "金融", "科技"],
    doors: [
      { title: "看看我能怎么帮你", label: "服务", href: "/about" },
      { title: "查看结果", label: "项目", href: "/projects" },
      { title: "告诉我哪里卡住了", label: "联系", href: "/contact" },
    ],
  },
  ko: {
    statement: ["문제를 알려주세요.", "어디부터 풀지 찾겠습니다."],
    eyebrow: "무엇이 막고 있나요?",
    problems: [
      { title: "방문자가 행동하지 않는다", lever: "웹사이트 · 사용자 경험 · 전환", firstLook: "방문자가 무엇을 이해하는지, 어디서 망설이는지, 다음 행동을 막는 것이 무엇인지 봅니다.", contexts: ["UX", "CRO", "유입"] },
      { title: "너무 오래 걸린다", lever: "AI · 자동화", firstLook: "반복 업무와 더 간단하게 만들거나 자동화할 수 있는 단계를 찾습니다.", contexts: ["AI 에이전트", "프로세스", "연동"] },
      { title: "도구가 더 이상 따라오지 못한다", lever: "데이터 · 자동화 · 연결", firstLook: "연결이 끊긴 곳, 규모가 커지며 문제가 생긴 곳, 다시 연결해야 할 곳을 봅니다.", contexts: ["데이터", "시스템", "운영"] },
      { title: "무엇부터 해야 할지 모르겠다", lever: "전략 · 성장 · 우선순위", firstLook: "진짜 문제, 지금 가장 중요한 것, 다음에 내려야 할 결정을 정리합니다.", contexts: ["전략", "포지셔닝", "성장"] },
    ],
    leverLabel: "제가 쓰는 방법",
    firstLookLabel: "먼저 보는 것",
    contextsLabel: "전문 영역",
    contactPrompt: "비슷한 상황이라면 무엇이 막고 있는지와 원하는 결과를 알려주세요.",
    contactCta: "막힌 지점을 알려주세요",
    proofLine: "실제 문제에, 필요한 해결책을 선택합니다.",
    proofContexts: ["의료", "스포츠", "리테일", "금융", "테크"],
    doors: [
      { title: "어떻게 도울 수 있는지 보기", label: "서비스", href: "/about" },
      { title: "결과 보기", label: "프로젝트", href: "/projects" },
      { title: "막힌 지점을 알려주세요", label: "문의", href: "/contact" },
    ],
  },
};

export default function HomeAllInOne({ locale = "fr" }: { locale?: Locale }) {
  const c = copy[locale];
  const [active, setActive] = useState(0);
  const { startTransition } = usePageTransition();
  const isRtl = locale === "ar";
  const selected = c.problems[active];
  const selectedProblem = PROJECT_PROBLEM_KEYS[active];
  const contactHref = `${localizedPath(locale, "/contact")}?problem=${selectedProblem}`;

  const selectProblem = (index: number, remember = false) => {
    setActive(index);
    if (remember) rememberProjectProblem(PROJECT_PROBLEM_KEYS[index]);
  };

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
                  <button key={problem.title} type="button" aria-pressed={isActive} aria-controls="problem-detail" onMouseEnter={() => selectProblem(index)} onFocus={() => selectProblem(index, true)} onClick={() => selectProblem(index, true)} className={`group flex w-full items-center justify-between border-b border-[#161616]/15 px-0 py-5 text-left transition last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F44A22] md:py-6 ${isActive ? "text-[#F44A22]" : "text-[#161616] hover:text-[#F44A22]"}`}>
                    <span className="flex items-center gap-4">
                      <span className="font-oswald text-xs font-bold text-[#161616]/25">0{index + 1}</span>
                      <span className="font-oswald text-[7vw] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[3.1vw]">{problem.title}</span>
                    </span>
                    <span className={`text-2xl transition-transform ${isActive ? "rotate-45" : "group-hover:rotate-45"}`}>↗</span>
                  </button>
                );
              })}
            </div>

            <div id="problem-detail" aria-live="polite" className="relative min-h-[540px] overflow-hidden px-0 py-8 md:min-h-[590px] md:py-10 lg:px-10 lg:py-12">
              <div className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-[#F44A22]/20" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
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
                <div className="border-t border-[#161616]/15 pt-6">
                  <p className="max-w-2xl text-sm leading-6 text-[#161616]/65">{c.contactPrompt}</p>
                  <Link href={contactHref} onClick={(e) => nav(e, contactHref)} className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F44A22] transition hover:text-[#161616]">
                    {c.contactCta}<ArrowUpRight size={14} />
                  </Link>
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
