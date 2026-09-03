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
    eyebrow: "LA MÉTHODE",
    doctrine: ["UNE EXPÉRIENCE HUMAINE EN FAÇADE.", "UNE INTELLIGENCE COMMERCIALE TRÈS STRUCTURÉE EN COULISSES."],
    support: "Vous échangez avec une personne. Le système, lui, veille à ce que le contexte, les besoins et les prochaines étapes ne se perdent pas.",
    navigation: "REPÈRES",
    directContact: "CONTACT DIRECT",
    rights: "TOUS DROITS RÉSERVÉS",
  },
  en: {
    eyebrow: "THE METHOD",
    doctrine: ["A HUMAN EXPERIENCE UP FRONT.", "RIGOROUSLY STRUCTURED COMMERCIAL INTELLIGENCE BEHIND THE SCENES."],
    support: "You speak with a person. The system makes sure the context, needs, and next steps never get lost.",
    navigation: "EXPLORE",
    directContact: "DIRECT CONTACT",
    rights: "ALL RIGHTS RESERVED",
  },
  es: {
    eyebrow: "EL MÉTODO",
    doctrine: ["UNA EXPERIENCIA HUMANA DE CARA A LAS PERSONAS.", "UNA INTELIGENCIA COMERCIAL MUY ESTRUCTURADA DETRÁS."],
    support: "Hablas con una persona. El sistema se encarga de que el contexto, las necesidades y los próximos pasos no se pierdan.",
    navigation: "EXPLORAR",
    directContact: "CONTACTO DIRECTO",
    rights: "TODOS LOS DERECHOS RESERVADOS",
  },
  pt: {
    eyebrow: "O MÉTODO",
    doctrine: ["UMA EXPERIÊNCIA HUMANA NA FRENTE.", "UMA INTELIGÊNCIA COMERCIAL MUITO ESTRUTURADA NOS BASTIDORES."],
    support: "Você conversa com uma pessoa. O sistema garante que o contexto, as necessidades e os próximos passos não se percam.",
    navigation: "EXPLORAR",
    directContact: "CONTATO DIRETO",
    rights: "TODOS OS DIREITOS RESERVADOS",
  },
  gcf: {
    eyebrow: "MÉTÒD-LA",
    doctrine: ["DOUVAN, ON ÈKSPÉRYANS ÈVÈ ON MOUN.", "DÈYÈ, ON ENTÉLIJANS KOMÈSYAL KI BYEN ÒWGANIZÉ."],
    support: "Ou ka palé èvè on moun. Sistèm-la ka véyé pou kontèks-la, bezwen-la é pwochen étap-la pa pèd.",
    navigation: "POU AY PLI LWEN",
    directContact: "KONTAK DIRÈK",
    rights: "TOUT DWA RÉZÈVÉ",
  },
  ar: {
    eyebrow: "المنهج",
    doctrine: ["تجربة إنسانية في الواجهة.", "وذكاء تجاري منظم بدقة خلف الكواليس."],
    support: "أنت تتحدث مع شخص. ويتولى النظام حفظ السياق والاحتياجات والخطوات التالية دون أن يضيع منها شيء.",
    navigation: "استكشف",
    directContact: "تواصل مباشر",
    rights: "جميع الحقوق محفوظة",
  },
  ja: {
    eyebrow: "進め方",
    doctrine: ["表にあるのは、人との対話。", "裏側には、緻密に設計された営業の仕組み。"],
    support: "お話を伺うのは人です。その裏で、状況やニーズ、次のステップを取りこぼさない仕組みが支えます。",
    navigation: "サイト案内",
    directContact: "直接のご連絡",
    rights: "ALL RIGHTS RESERVED",
  },
  zh: {
    eyebrow: "方法",
    doctrine: ["前台是人与人的体验。", "后台是高度结构化的商业智能。"],
    support: "你始终在与真实的人沟通，而系统负责确保背景、需求和下一步不会被遗漏。",
    navigation: "浏览",
    directContact: "直接联系",
    rights: "保留所有权利",
  },
  ko: {
    eyebrow: "접근 방식",
    doctrine: ["앞에서는 사람다운 경험을.", "뒤에서는 정교하게 설계된 비즈니스 인텔리전스를."],
    support: "대화는 사람이 직접 나눕니다. 시스템은 맥락과 요구사항, 다음 단계가 빠지지 않도록 뒷받침합니다.",
    navigation: "둘러보기",
    directContact: "직접 연락",
    rights: "ALL RIGHTS RESERVED",
  },
};
