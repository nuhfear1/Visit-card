import ProjectsView from "@/components/ProjectsView";
import { localizedLocales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localizedLocales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) return {};
  return createPageMetadata(params.locale as Locale, "projects", "/projects");
}

export default function LocalizedProjectsPage({ params }: { params: { locale: string } }) {
  if (!localizedLocales.includes(params.locale as Locale)) notFound();
  return <ProjectsView locale={params.locale as Locale} />;
}
