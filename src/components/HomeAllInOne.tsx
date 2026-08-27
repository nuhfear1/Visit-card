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
  contactPrompt: string;
  contactCta: string;
  proofLine: string;
  proofContexts: string[];
  doors: Array<{ title: string; label: string; href: "/about" | "/projects" | "/contact" }>;
};

const copy: Record<Locale, Copy> = {
  fr: {
    statement: ["VOUS VENEZ AVEC UN PROBLÈME.", "JE TROUVE LE BON LEVIER."],
    eyebrow: "QU’EST-CE QUI VOUS BLOQUE ?",
    problems: [
      { title: "ÇA NE CONVERTIT PAS", lever: "WEB · UX · CRO", firstLook: "Le parcours, le message et le point précis où l’intention se perd avant l’action.", contexts: ["EXPÉRIENCE DIGITALE", "CONVERSION", "ACQUISITION"] },
      { title: "ÇA PREND TROP DE TEMPS", lever: "AGENTS IA · AUTOMATISATION", firstLook: "Les tâches répétitives, les frictions et les étapes qui consomment encore du temps humain sans vraie valeur ajoutée.", contexts: ["IA", "PROCESS", "INTÉGRATIONS"] },
      { title: "ÇA NE SUIT PLUS", lever: "DATA · AUTOMATISATION · INTÉGRATIONS", firstLook: "Ce qui casse quand le volume augmente, ce qui reste déconnecté et ce qu’il faut structurer pour retrouver de la fluidité.", contexts: ["DATA", "SYSTÈMES", "OPÉRATIONS"] },
      { title: "ÇA MANQUE DE CLARTÉ", lever: "STRATÉGIE · CROISSANCE · PRIORISATION", firstLook: "Le vrai frein business avant de choisir un outil, un canal ou une technologie et la prochaine décision qui mérite d’être prise.", contexts: ["STRATÉGIE", "POSITIONNEMENT", "CROISSANCE"] },
    ],
    leverLabel: "OÙ J’INTERVIENS",
    firstLookLabel: "CE QUE JE VÉRIFIE D’ABORD",
    contextsLabel: "EXPERTISE MOBILISÉE",
    contactPrompt: "Vous vous reconnaissez ? Un problème, un objectif et quelques éléments de contexte suffisent pour commencer.",
    contactCta: "ME DIRE CE QUI BLOQUE",
    proofLine: "DES PROBLÈMES RÉELS. DES LEVIERS CHOISIS POUR LEUR IMPACT.",
    proofContexts: ["MÉDICAL", "SPORT", "RETAIL", "FINANCE", "TECH"],
    doors: [
      { title: "COMPRENDRE L’APPROCHE", label: "Services", href: "/about" },
      { title: "VOIR LES PREUVES", label: "Projets", href: "/projects" },
      { title: "ME DIRE CE QUI BLOQUE", label: "Contact", href: "/contact" },
    ],
  },
  en: {
    statement: ["YOU BRING THE PROBLEM.", "I FIND THE RIGHT LEVER."],
    eyebrow: "WHAT IS HOLDING YOU BACK?",
    problems: [
      { title: "IT DOESN’T CONVERT", lever: "WEB · UX · CRO", firstLook: "The journey, the message and the exact point where intent drops before action.", contexts: ["DIGITAL EXPERIENCE", "CONVERSION", "ACQUISITION"] },
      { title: "IT TAKES TOO LONG", lever: "AI AGENTS · AUTOMATION", firstLook: "Repetitive tasks, friction and steps that still consume human time without adding enough value.", contexts: ["AI", "PROCESS", "INTEGRATIONS"] },
      { title: "IT WON’T KEEP UP", lever: "DATA · AUTOMATION · INTEGRATIONS", firstLook: "What breaks as volume grows, what remains disconnected and what needs structure to restore flow.", contexts: ["DATA", "SYSTEMS", "OPERATIONS"] },
      { title: "IT LACKS CLARITY", lever: "STRATEGY · GROWTH · PRIORITIZATION", firstLook: "The real business constraint before choosing a tool, channel or technology, and the next decision worth making.", contexts: ["STRATEGY", "POSITIONING", "GROWTH"] },
    ],
    leverLabel: "WHERE I INTERVENE",
    firstLookLabel: "WHAT I CHECK FIRST",
    contextsLabel: "EXPERTISE IN PLAY",
    contactPrompt: "Recognize the problem? One goal and a little context are enough to start.",
    contactCta: "TELL ME WHAT’S STUCK",
    proofLine: "REAL PROBLEMS. LEVERS CHOSEN FOR IMPACT.",
    proofContexts: ["HEALTHCARE", "SPORT", "RETAIL", "FINANCE", "TECH"],
    doors: [
      { title: "UNDERSTAND THE APPROACH", label: "Services", href: "/about" },
      { title: "SEE THE PROOF", label: "Projects", href: "/projects" },
      { title: "TELL ME WHAT’S STUCK", label: "Contact", href: "/contact" },
    ],
  },
  es: {
    statement: ["TÚ TRAES EL PROBLEMA.", "YO ENCUENTRO LA PALANCA CORRECTA."],
    eyebrow: "¿QUÉ TE ESTÁ FRENANDO?",
    problems: [
      { title: "NO CONVIERTE", lever: "WEB · UX · CRO", firstLook: "El recorrido, el mensaje y el punto exacto donde la intención se pierde antes de la acción.", contexts: ["EXPERIENCIA DIGITAL", "CONVERSIÓN", "ADQUISICIÓN"] },
      { title: "TOMA DEMASIADO TIEMPO", lever: "AGENTES IA · AUTOMATIZACIÓN", firstLook: "Las tareas repetitivas, las fricciones y los pasos que siguen consumiendo tiempo humano sin aportar suficiente valor.", contexts: ["IA", "PROCESOS", "INTEGRACIONES"] },
      { title: "YA NO AGUANTA EL RITMO", lever: "DATOS · AUTOMATIZACIÓN · INTEGRACIONES", firstLook: "Qué se rompe cuando crece el volumen, qué sigue desconectado y qué hay que estructurar para recuperar fluidez.", contexts: ["DATOS", "SISTEMAS", "OPERACIONES"] },
      { title: "FALTA CLARIDAD", lever: "ESTRATEGIA · CRECIMIENTO · PRIORIDADES", firstLook: "El freno real del negocio antes de elegir herramienta, canal o tecnología y la próxima decisión que sí merece tomarse.", contexts: ["ESTRATEGIA", "POSICIONAMIENTO", "CRECIMIENTO"] },
    ],
    leverLabel: "DÓNDE INTERVENGO",
    firstLookLabel: "LO QUE REVISO PRIMERO",
    contextsLabel: "EXPERIENCIA ACTIVADA",
    contactPrompt: "¿Te reconoces aquí? Un problema, un objetivo y algo de contexto bastan para empezar.",
    contactCta: "CUÉNTAME QUÉ TE FRENA",
    proofLine: "PROBLEMAS REALES. PALANCAS ELEGIDAS POR SU IMPACTO.",
    proofContexts: ["SALUD", "DEPORTE", "RETAIL", "FINANZAS", "TECH"],
    doors: [
      { title: "ENTENDER EL ENFOQUE", label: "Servicios", href: "/about" },
      { title: "VER LAS PRUEBAS", label: "Proyectos", href: "/projects" },
      { title: "CUÉNTAME QUÉ TE FRENA", label: "Contacto", href: "/contact" },
    ],
  },
  pt: {
    statement: ["VOCÊ TRAZ O PROBLEMA.", "EU ENCONTRO A ALAVANCA CERTA."],
    eyebrow: "O QUE ESTÁ TE TRAVANDO?",
    problems: [
      { title: "NÃO CONVERTE", lever: "WEB · UX · CRO", firstLook: "A jornada, a mensagem e o ponto exato em que a intenção se perde antes da ação.", contexts: ["EXPERIÊNCIA DIGITAL", "CONVERSÃO", "AQUISIÇÃO"] },
      { title: "LEVA TEMPO DEMAIS", lever: "AGENTES DE IA · AUTOMAÇÃO", firstLook: "Tarefas repetitivas, atritos e etapas que ainda consomem tempo humano sem gerar valor suficiente.", contexts: ["IA", "PROCESSOS", "INTEGRAÇÕES"] },
      { title: "NÃO ACOMPANHA MAIS", lever: "DADOS · AUTOMAÇÃO · INTEGRAÇÕES", firstLook: "O que quebra quando o volume cresce, o que continua desconectado e o que precisa ser estruturado para recuperar fluidez.", contexts: ["DADOS", "SISTEMAS", "OPERAÇÕES"] },
      { title: "FALTA CLAREZA", lever: "ESTRATÉGIA · CRESCIMENTO · PRIORIZAÇÃO", firstLook: "O verdadeiro gargalo do negócio antes de escolher ferramenta, canal ou tecnologia e a próxima decisão que merece ser tomada.", contexts: ["ESTRATÉGIA", "POSICIONAMENTO", "CRESCIMENTO"] },
    ],
    leverLabel: "ONDE EU ATUO",
    firstLookLabel: "O QUE EU VERIFICO PRIMEIRO",
    contextsLabel: "EXPERTISE ATIVADA",
    contactPrompt: "Se você se reconhece aqui, um problema, um objetivo e um pouco de contexto já são suficientes para começar.",
    contactCta: "ME CONTE O QUE ESTÁ TRAVANDO",
    proofLine: "PROBLEMAS REAIS. ALAVANCAS ESCOLHIDAS PELO IMPACTO.",
    proofContexts: ["SAÚDE", "ESPORTE", "VAREJO", "FINANÇAS", "TECH"],
    doors: [
      { title: "ENTENDER A ABORDAGEM", label: "Serviços", href: "/about" },
      { title: "VER AS PROVAS", label: "Projetos", href: "/projects" },
      { title: "ME CONTE O QUE ESTÁ TRAVANDO", label: "Contato", href: "/contact" },
    ],
  },
  gcf: {
    statement: ["ZÒT KA VINI ÈVÈ PWOBLÈM-LA.", "MWEN KA CHWAZI BON LÉVYÉ-LA."],
    eyebrow: "KA KI KA BLOKÉ ZÒT?",
    problems: [
      { title: "I PA KA KONVÈTI", lever: "WEB · UX · CRO", firstLook: "Chimen itilizatè-la, mésaj-la é koté lentansyon ka pèd avan aksyon-la.", contexts: ["ÈSPÉRYANS DIJITAL", "KONVÈSYON", "AKIZISYON"] },
      { title: "I KA PRAN TWÒP TAN", lever: "AJAN IA · OTOMATIZASYON", firstLook: "Travay répétitif, friksyon é étap ki toujou ka manjé tan moun san yo pa pòté asé valè.", contexts: ["IA", "PWOSÉSIS", "ENTÉGRASYON"] },
      { title: "I PA KA SUIV ANKÒ", lever: "DATA · OTOMATIZASYON · ENTÉGRASYON", firstLook: "Sa ki ka kasé lè volim-la ka monté, sa ki pa konekté é sa pou mété an plas pou bagay-la wouklé pli byen.", contexts: ["DATA", "SISTÈM", "OPÉRASYON"] },
      { title: "I PA ASÉ KLÈ", lever: "STRATÉJI · KWASANS · PRIYORITÉ", firstLook: "Vrè blokaj biznis-la avan chwazi zouti, kanal oben teknoloji é pwochen désizyon-la ki vréman mérité fèt.", contexts: ["STRATÉJI", "POZISYONMAN", "KWASANS"] },
    ],
    leverLabel: "KOTÉ MWEN KA ENTÈVNI",
    firstLookLabel: "SA MWEN KA VÉRIFYÉ AN PRÈMYÉ",
    contextsLabel: "SA MWEN KA MOBILIZÉ",
    contactPrompt: "Si zòt ka rèkonnèt zòt adan sa, on pwoblèm, on òbjèktif é tibwen kontèks ka sifi pou koumansé.",
    contactCta: "DI MWEN SA KI KA BLOKÉ",
    proofLine: "PWOBLÈM VRÉ. LÉVYÉ CHWAZI POU ENPAK YO.",
    proofContexts: ["LASANTÉ", "SPÒ", "KOMÈS", "FINANS", "TECH"],
    doors: [
      { title: "KONPRANN MÉTÒD-LA", label: "Sèvis", href: "/about" },
      { title: "VWÈ PRÈV-LA", label: "Pwojé", href: "/projects" },
      { title: "DI MWEN SA KI KA BLOKÉ", label: "Kontak", href: "/contact" },
    ],
  },
  ar: {
    statement: ["أنت تأتي بالمشكلة.", "وأنا أختار الرافعة المناسبة."],
    eyebrow: "ما الذي يعيق التقدم؟",
    problems: [
      { title: "لا يحقق التحويل", lever: "الويب · تجربة المستخدم · تحسين التحويل", firstLook: "المسار والرسالة والنقطة الدقيقة التي تضيع عندها النية قبل اتخاذ الإجراء.", contexts: ["التجربة الرقمية", "التحويل", "الاكتساب"] },
      { title: "يستغرق وقتًا طويلًا", lever: "وكلاء الذكاء الاصطناعي · الأتمتة", firstLook: "المهام المتكررة ونقاط الاحتكاك والخطوات التي ما زالت تستهلك وقتًا بشريًا من دون قيمة كافية.", contexts: ["الذكاء الاصطناعي", "العمليات", "التكاملات"] },
      { title: "لم يعد يواكب النمو", lever: "البيانات · الأتمتة · التكاملات", firstLook: "ما الذي يتعطل مع زيادة الحجم، وما الذي ما زال منفصلًا، وما الذي يحتاج إلى هيكلة لاستعادة الانسيابية.", contexts: ["البيانات", "الأنظمة", "العمليات"] },
      { title: "يفتقر إلى الوضوح", lever: "الاستراتيجية · النمو · ترتيب الأولويات", firstLook: "العائق التجاري الحقيقي قبل اختيار أداة أو قناة أو تقنية، وما القرار التالي الذي يستحق اتخاذه.", contexts: ["الاستراتيجية", "التموضع", "النمو"] },
    ],
    leverLabel: "أين أتدخل",
    firstLookLabel: "ما الذي أتحقق منه أولًا",
    contextsLabel: "الخبرة المستخدمة",
    contactPrompt: "إذا كان هذا يشبه وضعك، فمشكلة واضحة وهدف وبعض السياق تكفي للبدء.",
    contactCta: "أخبرني ما الذي يعيقك",
    proofLine: "مشكلات حقيقية. روافع مختارة من أجل الأثر.",
    proofContexts: ["الصحة", "الرياضة", "التجزئة", "التمويل", "التقنية"],
    doors: [
      { title: "فهم المنهج", label: "الخدمات", href: "/about" },
      { title: "رؤية النتائج", label: "المشاريع", href: "/projects" },
      { title: "أخبرني ما الذي يعيقك", label: "تواصل", href: "/contact" },
    ],
  },
  ja: {
    statement: ["課題を持ってきてください。", "最適なレバーはこちらで選びます。"],
    eyebrow: "何が止めていますか？",
    problems: [
      { title: "成果につながらない", lever: "WEB · UX · CRO", firstLook: "導線、メッセージ、そして行動の直前で意図が失われているポイント。", contexts: ["デジタル体験", "コンバージョン", "集客"] },
      { title: "時間がかかりすぎる", lever: "AIエージェント · 自動化", firstLook: "反復作業、摩擦、そして十分な価値を生まずに人の時間を使っている工程。", contexts: ["AI", "業務", "連携"] },
      { title: "成長についていけない", lever: "データ · 自動化 · 連携", firstLook: "量が増えた時に壊れる部分、分断されたままの部分、流れを戻すために構造化すべき部分。", contexts: ["データ", "システム", "業務"] },
      { title: "整理されていない", lever: "戦略 · 成長 · 優先順位", firstLook: "ツール、チャネル、技術を選ぶ前にある本当の事業上の制約と、次に決めるべきこと。", contexts: ["戦略", "ポジショニング", "成長"] },
    ],
    leverLabel: "介入する領域",
    firstLookLabel: "最初に確認すること",
    contextsLabel: "活用する専門性",
    contactPrompt: "当てはまる課題があれば、課題と目標、少しの背景があれば始められます。",
    contactCta: "課題を相談する",
    proofLine: "現実の課題。成果につながるレバーを選ぶ。",
    proofContexts: ["医療", "スポーツ", "小売", "金融", "TECH"],
    doors: [
      { title: "アプローチを知る", label: "サービス", href: "/about" },
      { title: "実績を見る", label: "プロジェクト", href: "/projects" },
      { title: "課題を相談する", label: "お問い合わせ", href: "/contact" },
    ],
  },
  zh: {
    statement: ["你带着问题来。", "我来找到正确的杠杆。"],
    eyebrow: "真正卡住你的是什么？",
    problems: [
      { title: "无法转化", lever: "WEB · UX · CRO", firstLook: "用户路径、信息表达，以及行动之前意图流失的准确位置。", contexts: ["数字体验", "转化", "获客"] },
      { title: "耗时太长", lever: "AI智能体 · 自动化", firstLook: "重复任务、摩擦点，以及仍在消耗人工时间却没有带来足够价值的环节。", contexts: ["AI", "流程", "集成"] },
      { title: "已经跟不上增长", lever: "数据 · 自动化 · 集成", firstLook: "规模增长后哪里开始失效，哪些环节仍彼此割裂，以及需要先结构化什么来恢复顺畅。", contexts: ["数据", "系统", "运营"] },
      { title: "缺少清晰度", lever: "战略 · 增长 · 优先级", firstLook: "在选择工具、渠道或技术之前真正的业务阻力，以及下一步最值得做出的决定。", contexts: ["战略", "定位", "增长"] },
    ],
    leverLabel: "我会介入的地方",
    firstLookLabel: "我会先检查什么",
    contextsLabel: "调用的专业能力",
    contactPrompt: "如果你也遇到类似问题，一个问题、一个目标和一点背景信息就足够开始。",
    contactCta: "告诉我哪里卡住了",
    proofLine: "真实问题。选择真正有影响的杠杆。",
    proofContexts: ["医疗", "体育", "零售", "金融", "科技"],
    doors: [
      { title: "了解方法", label: "服务", href: "/about" },
      { title: "查看成果", label: "项目", href: "/projects" },
      { title: "告诉我哪里卡住了", label: "联系", href: "/contact" },
    ],
  },
  ko: {
    statement: ["문제를 가져오세요.", "맞는 레버는 제가 찾습니다."],
    eyebrow: "무엇이 막고 있나요?",
    problems: [
      { title: "전환이 나오지 않는다", lever: "WEB · UX · CRO", firstLook: "사용자 흐름, 메시지, 그리고 행동 직전에 의도가 사라지는 정확한 지점.", contexts: ["디지털 경험", "전환", "유입"] },
      { title: "시간이 너무 오래 걸린다", lever: "AI 에이전트 · 자동화", firstLook: "반복 업무, 마찰 지점, 그리고 충분한 가치를 만들지 못한 채 사람의 시간을 쓰는 단계.", contexts: ["AI", "프로세스", "연동"] },
      { title: "성장을 따라가지 못한다", lever: "데이터 · 자동화 · 연동", firstLook: "규모가 커질 때 무엇이 깨지고, 무엇이 분리되어 있으며, 흐름을 되찾기 위해 무엇을 구조화해야 하는지.", contexts: ["데이터", "시스템", "운영"] },
      { title: "명확하지 않다", lever: "전략 · 성장 · 우선순위", firstLook: "도구, 채널, 기술을 고르기 전에 있는 실제 비즈니스 제약과 다음으로 내려야 할 결정.", contexts: ["전략", "포지셔닝", "성장"] },
    ],
    leverLabel: "제가 개입할 지점",
    firstLookLabel: "먼저 확인할 것",
    contextsLabel: "활용하는 전문성",
    contactPrompt: "비슷한 문제라면, 문제와 목표 그리고 약간의 맥락만으로 시작할 수 있습니다.",
    contactCta: "막힌 지점을 알려주세요",
    proofLine: "실제 문제. 영향이 있는 레버를 선택합니다.",
    proofContexts: ["의료", "스포츠", "리테일", "금융", "테크"],
    doors: [
      { title: "접근 방식 이해하기", label: "서비스", href: "/about" },
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
  const contactHref = localizedPath(locale, "/contact");

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

            <div className="relative min-h-[540px] overflow-hidden px-0 py-8 md:min-h-[590px] md:py-10 lg:px-10 lg:py-12">
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
