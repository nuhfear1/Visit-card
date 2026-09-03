import type { Locale } from "@/lib/i18n";

type FooterCopy = {
  eyebrow: string;
  doctrine: [string, string];
  support: string;
  navigation: string;
  directContact: string;
  rights: string;
};

export const footerCopy: Record<Locale, FooterCopy> = {
  fr: {
    eyebrow: "LE BON POINT DE DÉPART",
    doctrine: ["COMPRENDRE CE QUI BLOQUE.", "ACTIVER CE QUI FERA AVANCER."],
    support: "Stratégie, IA, web ou acquisition : la solution vient après. Le point de départ, c’est votre objectif, votre contexte et le vrai frein à lever.",
    navigation: "REPÈRES",
    directContact: "CONTACT DIRECT",
    rights: "TOUS DROITS RÉSERVÉS",
  },
  en: {
    eyebrow: "THE RIGHT STARTING POINT",
    doctrine: ["UNDERSTAND WHAT IS HOLDING YOU BACK.", "USE THE RIGHT LEVER TO MOVE FORWARD."],
    support: "Strategy, AI, web or acquisition: the solution comes second. We start with your objective, your context and the real obstacle to remove.",
    navigation: "EXPLORE",
    directContact: "DIRECT CONTACT",
    rights: "ALL RIGHTS RESERVED",
  },
  es: {
    eyebrow: "EL PUNTO DE PARTIDA CORRECTO",
    doctrine: ["ENTENDER QUÉ ESTÁ FRENANDO EL PROYECTO.", "ACTIVAR LA PALANCA QUE LO HARÁ AVANZAR."],
    support: "Estrategia, IA, web o adquisición: la solución viene después. Primero están tu objetivo, tu contexto y el freno que realmente hay que resolver.",
    navigation: "EXPLORAR",
    directContact: "CONTACTO DIRECTO",
    rights: "TODOS LOS DERECHOS RESERVADOS",
  },
  pt: {
    eyebrow: "O PONTO DE PARTIDA CERTO",
    doctrine: ["ENTENDER O QUE ESTÁ TRAVANDO O PROJETO.", "ACIONAR A ALAVANCA QUE VAI FAZÊ-LO AVANÇAR."],
    support: "Estratégia, IA, web ou aquisição: a solução vem depois. Primeiro estão seu objetivo, seu contexto e o bloqueio que realmente precisa ser resolvido.",
    navigation: "EXPLORAR",
    directContact: "CONTATO DIRETO",
    rights: "TODOS OS DIREITOS RESERVADOS",
  },
  gcf: {
    eyebrow: "BON BITEN-LA POU KOUMANSÉ",
    doctrine: ["KONPRANN KA KI KA FRENNÉ PWOJÉ-LA.", "SÈVI ÈVÈ BON ZOUTI-LA POU FÈ-Y VANSÉ."],
    support: "Stratéji, IA, wèb oben akizisyon : solisyon-la ka vini apré. Dabò, fò nou gadé òbjèktif a-w, sitiyasyon a-w é vré biten-la ki ka frenné pwojé-la.",
    navigation: "POU AY PLI LWEN",
    directContact: "KONTAK DIRÈK",
    rights: "TOUT DWA RÉZÈVÉ",
  },
  ar: {
    eyebrow: "نقطة البداية الصحيحة",
    doctrine: ["نفهم ما الذي يعيق المشروع.", "ونختار ما يدفعه إلى الأمام."],
    support: "الاستراتيجية أو الذكاء الاصطناعي أو الويب أو الاستحواذ تأتي كحلول لاحقًا. البداية تكون من هدفك وسياقك والعائق الحقيقي الذي يجب تجاوزه.",
    navigation: "استكشف",
    directContact: "تواصل مباشر",
    rights: "جميع الحقوق محفوظة",
  },
  ja: {
    eyebrow: "正しい出発点",
    doctrine: ["何が前進を妨げているのかを見極める。", "必要な打ち手で、プロジェクトを前へ。"],
    support: "戦略、AI、Web、集客。手段を決めるのはその後です。まずは目標と状況、そして本当に解消すべき課題を明らかにします。",
    navigation: "サイト案内",
    directContact: "直接のご連絡",
    rights: "ALL RIGHTS RESERVED",
  },
  zh: {
    eyebrow: "正确的起点",
    doctrine: ["先看清项目卡在哪里。", "再用正确的方法推动它前进。"],
    support: "战略、AI、网站还是获客，解决方案是下一步。我们先从你的目标、现状和真正需要解决的阻碍出发。",
    navigation: "浏览",
    directContact: "直接联系",
    rights: "保留所有权利",
  },
  ko: {
    eyebrow: "올바른 출발점",
    doctrine: ["무엇이 프로젝트를 막고 있는지 파악합니다.", "맞는 해법으로 앞으로 나아갑니다."],
    support: "전략, AI, 웹, 고객 확보 중 무엇을 쓸지는 그다음입니다. 먼저 목표와 상황, 그리고 실제로 해결해야 할 장애물부터 살펴봅니다.",
    navigation: "둘러보기",
    directContact: "직접 연락",
    rights: "ALL RIGHTS RESERVED",
  },
};
