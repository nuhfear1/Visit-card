import Contact from "@/components/Contact";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) return {};
  return createPageMetadata(params.locale as Locale, "contact", "/contact");
}

export default function LocalizedContactPage({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  return (
    <main className="relative min-h-screen bg-palette-grey overflow-hidden">
      <Contact locale={locale} />
    </main>
  );
}
