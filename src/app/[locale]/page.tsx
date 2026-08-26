import Hero from "@/components/Hero";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) return {};
  return createPageMetadata(params.locale as Locale, "home", "/");
}

export default function LocalizedHome({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <Hero locale={locale} />
    </main>
  );
}
