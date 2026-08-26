import FaqView from "@/components/FaqView";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) return {};
  return createPageMetadata(params.locale as Locale, "faq", "/faq");
}

export default function LocalizedFaqPage({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) notFound();
  return <FaqView locale={params.locale as Locale} />;
}
