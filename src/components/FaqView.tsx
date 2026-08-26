"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { getSanitizedFaqCopy } from "@/lib/faq-sanitized";
import { getFaqTerminology } from "@/lib/faq-terminology";
import { localizedPath, type Locale } from "@/lib/i18n";

export default function FaqView({ locale = "fr" }: { locale?: Locale }) {
  const copy = getSanitizedFaqCopy(locale);
  const terminology = getFaqTerminology(locale);
  let count = 0;
  const eyebrowSuffix = copy.eyebrow.includes("/") ? copy.eyebrow.split("/").slice(1).join("/").trim() : copy.eyebrow;
  const localizedEyebrow = `${terminology.pageLabel} / ${eyebrowSuffix}`;

  return (
    <main className="min-h-screen bg-[#E4E2E3] text-[#161616]">
      <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#F44A22]/12 blur-3xl" />
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)] lg:items-end lg:gap-16">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F44A22] sm:text-xs">{localizedEyebrow}</p>
              <h1 className="max-w-6xl font-oswald text-[15vw] font-black uppercase leading-[.82] tracking-[-0.055em] sm:text-[11vw] lg:text-[7.4vw] xl:text-[6.7vw]">
                <span className="block">{copy.headline[0]}</span>
                <span className="block text-[#F44A22]">{copy.headline[1]}</span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-sm leading-7 text-[#161616]/65 sm:text-base sm:leading-8">{copy.intro}</p>
              <div className="mt-7 flex items-center gap-3 border-t border-[#161616]/15 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#161616]/45">
                <span className="h-2 w-2 rounded-full bg-[#F44A22]" />
                {copy.indexLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1500px] border-t border-[#161616]/20">
          {copy.sections.map((section, sectionIndex) => (
            <div key={section.label} className="grid border-b border-[#161616]/20 lg:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="border-b border-[#161616]/10 py-8 lg:border-b-0 lg:border-r lg:border-[#161616]/15 lg:py-10 lg:pr-10">
                <div className="sticky top-28">
                  <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-[#161616]/35">0{sectionIndex + 1}</div>
                  <h2 className="font-oswald text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl">{section.label}</h2>
                </div>
              </aside>

              <div className="lg:pl-10">
                {section.items.map((item) => {
                  count += 1;
                  const number = String(count).padStart(2, "0");
                  return (
                    <details key={item.question} className="group border-b border-[#161616]/15 last:border-b-0">
                      <summary className="flex cursor-pointer list-none items-start gap-4 py-7 sm:gap-6 sm:py-8 [&::-webkit-details-marker]:hidden">
                        <span className="mt-1 shrink-0 text-[10px] font-bold tracking-[0.18em] text-[#F44A22]">{number}</span>
                        <span className="min-w-0 flex-1 font-oswald text-[7vw] font-bold uppercase leading-[.95] tracking-[-0.025em] sm:text-3xl lg:text-4xl">{item.question}</span>
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#161616]/20 transition-transform duration-300 group-open:rotate-45 group-open:bg-[#161616] group-open:text-white sm:h-10 sm:w-10">
                          <Plus size={18} strokeWidth={1.8} />
                        </span>
                      </summary>
                      <div className="grid pb-8 pl-8 sm:pl-10 lg:grid-cols-[minmax(0,1fr)_180px] lg:gap-10 lg:pb-10 lg:pl-12">
                        <p className="max-w-3xl text-sm leading-7 text-[#161616]/68 sm:text-base sm:leading-8">{item.answer}</p>
                        <div className="hidden lg:block" />
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#161616] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F44A22] sm:text-xs">{copy.ctaEyebrow}</p>
            <h2 className="max-w-5xl font-oswald text-[11vw] font-black uppercase leading-[.86] tracking-[-0.045em] sm:text-[8vw] lg:text-[5.5vw]">{copy.ctaHeadline}</h2>
          </div>
          <div>
            <p className="mb-7 max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">{copy.ctaText}</p>
            <Link href={localizedPath(locale, "/contact")} className="inline-flex items-center gap-3 rounded-full bg-[#F44A22] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[#161616]">
              {copy.cta}<ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
