"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, Check, RotateCcw, ScanSearch } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { contactFormCopy } from "@/lib/contact-form-copy";
import {
  PROJECT_PROBLEM_KEYS,
  captureFunnelContext,
  createProjectConversationPayload,
  submitProjectConversation,
  type ProjectProblemKey,
} from "@/lib/funnel";

type FormStatus = "idle" | "submitting" | "success" | "fallback" | "error";

const fieldClass = "mt-2 w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/30 focus:border-[#F44A22] focus:ring-2 focus:ring-[#F44A22]/25";
const labelClass = "text-[10px] font-bold uppercase tracking-[0.17em] text-white/55";

export default function ProjectConversationForm({ locale }: { locale: Locale }) {
  const copy = contactFormCopy[locale];
  const isRtl = locale === "ar";
  const [diagnosticRequested, setDiagnosticRequested] = useState(false);
  const [diagnosticFocus, setDiagnosticFocus] = useState<ProjectProblemKey | "">("");
  const [selectedProblem, setSelectedProblem] = useState<ProjectProblemKey | "">("");
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const context = captureFunnelContext();
    setSelectedProblem(context.problem);
    if (context.problem) setDiagnosticFocus(context.problem);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url_confirm") || "").trim()) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const payload = createProjectConversationPayload(locale, {
      contact: {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        organisation: String(data.get("organisation") || "").trim(),
        website: String(data.get("website") || "").trim(),
      },
      project: {
        message: String(data.get("message") || "").trim(),
        problem: selectedProblem,
      },
      diagnostic: {
        requested: diagnosticRequested,
        focus: diagnosticRequested ? diagnosticFocus : "",
        context: diagnosticRequested ? String(data.get("diagnosticContext") || "").trim() : "",
      },
    });

    try {
      const result = await submitProjectConversation(payload);
      if (result.kind === "email-fallback") {
        setStatus("fallback");
        window.location.assign(result.href);
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto mt-24 max-w-7xl rounded-[2.5rem] bg-[#161616] px-6 py-16 text-white md:px-12 md:py-20" dir={isRtl ? "rtl" : "ltr"} role="status" aria-live="polite">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F44A22] text-white"><Check size={25} /></div>
        <h2 className="mt-8 font-oswald text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl">{copy.successTitle}</h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">{copy.successText}</p>
        {diagnosticRequested ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">{copy.successDiagnosticText}</p> : null}
      </div>
    );
  }

  return (
    <section id="project-conversation" className="mx-auto mt-24 max-w-7xl scroll-mt-28 rounded-[2.5rem] bg-[#161616] px-6 py-10 text-white md:px-10 md:py-14 lg:px-14" dir={isRtl ? "rtl" : "ltr"}>
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F44A22]">{copy.eyebrow}</div>
          <h2 className="mt-5 font-oswald text-[15vw] font-black uppercase leading-[0.8] tracking-[-0.055em] sm:text-7xl lg:text-[5.4rem]">
            {copy.headline[0]}<span className="block text-stroke-orange">{copy.headline[1]}</span>
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 md:text-base">{copy.intro}</p>
          {selectedProblem ? (
            <div className="mt-8 rounded-2xl border border-[#F44A22]/35 bg-[#F44A22]/10 px-4 py-4 text-sm text-white/75">
              <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-[#F44A22]">{copy.selectedProblem}</span>
              <span className="mt-2 block font-semibold">{copy.problemOptions[selectedProblem]}</span>
            </div>
          ) : null}
        </div>

        <form onSubmit={onSubmit} className="relative" aria-describedby="project-form-privacy project-form-status" aria-busy={status === "submitting"}>
          <div className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company_url_confirm">Company URL confirmation</label>
            <input id="company_url_confirm" name="company_url_confirm" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              {copy.name}
              <input className={fieldClass} name="name" type="text" autoComplete="name" placeholder={copy.namePlaceholder} required maxLength={120} />
            </label>
            <label className={labelClass}>
              {copy.email}
              <input className={fieldClass} name="email" type="email" inputMode="email" autoComplete="email" placeholder={copy.emailPlaceholder} required maxLength={180} dir="ltr" />
            </label>
            <label className={labelClass}>
              {copy.organisation} <span className="font-normal normal-case tracking-normal text-white/30">({copy.optional})</span>
              <input className={fieldClass} name="organisation" type="text" autoComplete="organization" placeholder={copy.organisationPlaceholder} maxLength={160} />
            </label>
            <label className={labelClass}>
              {copy.website} <span className="font-normal normal-case tracking-normal text-white/30">({copy.optional})</span>
              <input className={fieldClass} name="website" type="text" inputMode="url" autoComplete="url" placeholder={copy.websitePlaceholder} maxLength={300} dir="ltr" />
            </label>
          </div>

          <label className={`${labelClass} mt-5 block`}>
            {copy.message}
            <textarea className={`${fieldClass} min-h-40 resize-y`} name="message" placeholder={copy.messagePlaceholder} required minLength={20} maxLength={4000} />
          </label>

          <div className={`mt-6 rounded-3xl border p-5 transition ${diagnosticRequested ? "border-[#F44A22] bg-[#F44A22]/10" : "border-white/15 bg-white/[0.04] hover:border-white/30"}`}>
            <label className="flex cursor-pointer items-start gap-4">
              <input className="peer sr-only" type="checkbox" checked={diagnosticRequested} onChange={(event) => setDiagnosticRequested(event.target.checked)} />
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/30 transition peer-checked:border-[#F44A22] peer-checked:bg-[#F44A22] peer-focus-visible:ring-2 peer-focus-visible:ring-[#F44A22] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#161616]">
                {diagnosticRequested ? <Check size={15} /> : null}
              </span>
              <span>
                <span className="flex items-center gap-2 text-sm font-bold text-white"><ScanSearch size={17} className="text-[#F44A22]" />{copy.diagnosticTitle}</span>
                <span className="mt-2 block text-xs leading-5 text-white/50">{copy.diagnosticText}</span>
              </span>
            </label>

            {diagnosticRequested ? (
              <div className="mt-6 grid gap-5 border-t border-white/10 pt-6">
                <label className={labelClass}>
                  {copy.diagnosticFocus}
                  <select className={fieldClass} name="diagnosticFocus" value={diagnosticFocus} onChange={(event) => setDiagnosticFocus(event.target.value as ProjectProblemKey | "")} required>
                    <option value="" className="text-[#161616]">{copy.diagnosticPlaceholder}</option>
                    {PROJECT_PROBLEM_KEYS.map((problem) => <option key={problem} value={problem} className="text-[#161616]">{copy.problemOptions[problem]}</option>)}
                  </select>
                </label>
                <label className={labelClass}>
                  {copy.diagnosticContext} <span className="font-normal normal-case tracking-normal text-white/30">({copy.optional})</span>
                  <textarea className={`${fieldClass} min-h-28 resize-y`} name="diagnosticContext" placeholder={copy.diagnosticContextPlaceholder} maxLength={1800} />
                </label>
              </div>
            ) : null}
          </div>

          <p id="project-form-privacy" className="mt-5 text-[11px] leading-5 text-white/40">{copy.privacy}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F44A22] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition hover:bg-white hover:text-[#161616] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616] disabled:cursor-wait disabled:opacity-60">
              {status === "submitting" ? copy.submitting : copy.submit}<ArrowUpRight size={15} />
            </button>
            {status === "error" ? (
              <button type="button" onClick={() => setStatus("idle")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <RotateCcw size={14} />{copy.retry}
              </button>
            ) : null}
          </div>

          <div id="project-form-status" className={`mt-4 min-h-6 text-xs leading-5 ${status === "error" ? "text-[#ff8a70]" : "text-white/50"}`} role="status" aria-live="polite">
            {status === "error" ? copy.errorText : status === "fallback" ? copy.fallbackText : ""}
          </div>
        </form>
      </div>
    </section>
  );
}
