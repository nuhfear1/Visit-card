import "@/lib/i18n-gcf";
import ProjectsView from "@/components/ProjectsView";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export default function LocalizedProjectsPage({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) notFound();
  return <ProjectsView locale={params.locale as Locale} />;
}
