import type { Metadata } from "next";
import { allLocales, getCopy, localizedPath, type Locale } from "@/lib/i18n";
import { getSanitizedFaqCopy } from "@/lib/faq-sanitized";
import { getFaqTerminology } from "@/lib/faq-terminology";

const SITE_URL = "https://nuhfear1.github.io/Visit-card";
const SOCIAL_IMAGE = `${SITE_URL}/gary-services.webp`;

const languageTags: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-419",
  pt: "pt-BR",
  gcf: "gcf",
  ar: "ar",
  ja: "ja-JP",
  zh: "zh-CN",
  ko: "ko-KR",
};

const absoluteUrl = (locale: Locale, path: string) => `${SITE_URL}${localizedPath(locale, path)}`;

const alternatesFor = (locale: Locale, path: string) => ({
  canonical: absoluteUrl(locale, path),
  languages: {
    ...Object.fromEntries(allLocales.map((code) => [languageTags[code], absoluteUrl(code, path)])),
    "x-default": absoluteUrl("fr", path),
  },
});

export type SeoPage = "home" | "services" | "projects" | "faq" | "contact";

export function createPageMetadata(locale: Locale, page: SeoPage, path: string): Metadata {
  const copy = getCopy(locale);
  const faqCopy = getSanitizedFaqCopy(locale);
  const faqTerminology = getFaqTerminology(locale);
  const pageTitle = page === "home"
    ? copy.hero.lead.replace(/\.$/, "")
    : page === "services"
      ? copy.servicesPage.pageLabel
      : page === "projects"
        ? copy.projectsPage.eyebrow.split("/")[0].trim()
        : page === "faq"
          ? faqTerminology.seoTitle
          : copy.contactPage.eyebrow.split("/")[0].trim();

  const description = page === "home"
    ? copy.hero.intro
    : page === "services"
      ? copy.servicesPage.intro
      : page === "projects"
        ? copy.projectsPage.intro
        : page === "faq"
          ? faqCopy.seoDescription
          : copy.contactPage.intro;

  const title = page === "home"
    ? `Gary WILFRED-BORILLA | ${pageTitle}`
    : `${pageTitle} | Gary WILFRED-BORILLA`;

  const url = absoluteUrl(locale, path);

  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Gary WILFRED-BORILLA",
      locale: languageTags[locale].replace("-", "_"),
      type: "website",
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "Gary WILFRED-BORILLA, stratégie, IA, web et acquisition",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
