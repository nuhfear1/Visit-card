import type { Locale } from "@/lib/i18n";

type FaqTerminology = {
  navLabel: string;
  pageLabel: string;
  seoTitle: string;
};

const terminology: Record<Locale, FaqTerminology> = {
  fr: {
    navLabel: "FAQ",
    pageLabel: "FAQ",
    seoTitle: "FAQ",
  },
  en: {
    navLabel: "Q&A",
    pageLabel: "Q&A",
    seoTitle: "Q&A",
  },
  es: {
    navLabel: "Preguntas",
    pageLabel: "PREGUNTAS FRECUENTES",
    seoTitle: "Preguntas frecuentes",
  },
  pt: {
    navLabel: "Dúvidas",
    pageLabel: "PERGUNTAS FREQUENTES",
    seoTitle: "Perguntas frequentes",
  },
  gcf: {
    navLabel: "Kèsyon",
    pageLabel: "KÈSYON É RÉPONS",
    seoTitle: "Kèsyon é répons",
  },
  ar: {
    navLabel: "الأسئلة",
    pageLabel: "الأسئلة الشائعة",
    seoTitle: "الأسئلة الشائعة",
  },
  ja: {
    navLabel: "よくある質問",
    pageLabel: "よくある質問",
    seoTitle: "よくある質問",
  },
  zh: {
    navLabel: "常见问题",
    pageLabel: "常见问题",
    seoTitle: "常见问题",
  },
  ko: {
    navLabel: "자주 묻는 질문",
    pageLabel: "자주 묻는 질문",
    seoTitle: "자주 묻는 질문",
  },
};

export const getFaqTerminology = (locale: Locale): FaqTerminology => terminology[locale];
