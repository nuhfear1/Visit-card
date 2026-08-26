import "@/lib/i18n-gcf";
import About from "@/components/About";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export default function LocalizedAboutPage({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <main className="relative min-h-screen bg-palette-grey">
      <About locale={locale} />
    </main>
  );
}
