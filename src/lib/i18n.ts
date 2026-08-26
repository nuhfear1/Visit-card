import {
  copyByLocale as baseCopyByLocale,
  type Locale as BaseLocale,
  type SiteCopy,
} from "@/lib/i18n-base";
import { gcfCopy } from "@/lib/i18n-gcf-data";
import { sanitizeTextContent } from "@/lib/text-sanitize";

export type Locale = BaseLocale | "gcf";
export type { SiteCopy } from "@/lib/i18n-base";

export const localizedLocales: Locale[] = ["en", "es", "pt", "gcf", "ar", "ja", "zh", "ko"];
export const allLocales: Locale[] = ["fr", ...localizedLocales];

export const localeOptions: { code: Locale; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "es", label: "Español (Latam)" },
  { code: "pt", label: "Português" },
  { code: "gcf", label: "Kréyòl" },
  { code: "ar", label: "العربية" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

export const isLocale = (value: string): value is Locale => allLocales.includes(value as Locale);

export const getLocaleFromPathname = (pathname: string): Locale => {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) && first !== "fr" ? first : "fr";
};

export const stripLocaleFromPathname = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && localizedLocales.includes(parts[0] as Locale)) parts.shift();
  return parts.length ? `/${parts.join("/")}` : "/";
};

export const localizedPath = (locale: Locale, pathname: string) => {
  const base = stripLocaleFromPathname(pathname);
  if (locale === "fr") return base;
  return base === "/" ? `/${locale}` : `/${locale}${base}`;
};

export const copyByLocale: Record<Locale, SiteCopy> = sanitizeTextContent({
  ...(baseCopyByLocale as Record<BaseLocale, SiteCopy>),
  gcf: gcfCopy,
});

export const getCopy = (locale: Locale = "fr") => copyByLocale[locale];
