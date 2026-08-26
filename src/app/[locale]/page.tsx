import Hero from "@/components/Hero";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
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
