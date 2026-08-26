import React from "react";
import { getCopy, localizedPath, type Locale } from "@/lib/i18n";

const colors = [
  ["#F44A22", "#D1C4E9"],
  ["#00F2FE", "#4FACFE"],
  ["#9B51E0", "#E94057"],
  ["#FFAD29", "#F44A22"],
  ["#12B886", "#0B7285"],
  ["#2563EB", "#A3E635"],
];

export default function ImageMaskGrid({ locale = "fr" }: { locale?: Locale }) {
  const copy = getCopy(locale).projectsPage;

  return (
    <div className="w-full px-4 md:px-6">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {copy.projects.map((project, index) => (
          <article
            key={`${index}-${project.title}`}
            className={`group relative min-h-[520px] overflow-hidden border-2 border-[#161616] bg-[#161616] ${
              index === 0
                ? "lg:col-span-2 rounded-tl-[5rem] rounded-br-[2rem]"
                : index === 5
                  ? "lg:col-span-2 rounded-tr-[5rem] rounded-bl-[2rem]"
                  : index % 2 === 0
                    ? "rounded-tl-[5rem] rounded-br-[2rem]"
                    : "rounded-tr-[5rem] rounded-bl-[2rem]"
            }`}
          >
            <div className="absolute -left-[20%] -top-[15%] h-[75%] w-[90%] rounded-full blur-[55px] transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: colors[index][0] }} />
            <div className="absolute -right-[18%] top-[20%] h-[75%] w-[90%] rounded-full blur-[55px] transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-4" style={{ backgroundColor: colors[index][1] }} />
            <div className="absolute -bottom-[25%] left-0 h-[65%] w-full rounded-full bg-[#161616] blur-[35px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.8),transparent_20%)] opacity-70" />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/5" />

            <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 text-[#FEF8E8] md:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-6">
                <span className="font-cormorant text-5xl font-bold opacity-45 transition-opacity group-hover:opacity-100 md:text-6xl">0{index + 1}</span>
                <div className="text-right text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">{project.tags}</div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)] lg:items-end">
                <div>
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{copy.situation}</div>
                  <h2 className="max-w-4xl font-oswald text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">{project.title}</h2>
                </div>

                <ul className="space-y-3 border-t border-white/20 pt-4">
                  {project.facts.map(([label, value]) => (
                    <li key={label} className="grid grid-cols-[96px_1fr] gap-3 border-b border-white/10 pb-3 text-xs leading-relaxed md:text-sm">
                      <span className="font-bold uppercase tracking-[0.1em] text-white/45">{label}</span>
                      <span className="text-white/85">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-4 overflow-hidden rounded-[3rem] border-2 border-[#161616] bg-[#161616]">
        <div className="relative min-h-80 overflow-hidden">
          <div className="absolute -left-[10%] -top-[35%] h-[120%] w-[70%] rounded-full bg-[#4A00E0] blur-[55px]" />
          <div className="absolute -right-[10%] top-[5%] h-[110%] w-[70%] rounded-full bg-[#8E2DE2] blur-[55px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.75),transparent_26%)]" />
          <div className="relative z-10 flex min-h-80 flex-col items-center justify-center px-6 text-center text-[#FEF8E8]">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{copy.ctaEyebrow}</div>
            <h2 className="mt-3 max-w-4xl font-oswald text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">{copy.ctaHeadline}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">{copy.ctaText}</p>
            <a href={`/Visit-card${localizedPath(locale, "/contact")}/`} className="mt-7 rounded-full border border-white/35 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition hover:bg-white hover:text-[#161616]">
              {copy.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
