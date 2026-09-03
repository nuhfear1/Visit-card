import type { Locale } from "@/lib/i18n";
import {
  isN8nProjectConversationConfigured,
  isPublicApiConfigured,
  n8nWebhookUrls,
  postN8nWebhook,
  postPublicApi,
  PUBLIC_API_ROUTES,
} from "@/lib/public-api";

export const PROJECT_PROBLEM_KEYS = ["conversion", "manual-work", "systems", "strategy"] as const;

export type ProjectProblemKey = (typeof PROJECT_PROBLEM_KEYS)[number];

type AcquisitionContext = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  referrer: string;
  landingPage: string;
  sessionId: string;
  problem: ProjectProblemKey | "";
};

export type ProjectConversationPayload = {
  schemaVersion: "1.1";
  eventType: "project.conversation.submitted";
  eventId: string;
  correlationId: string;
  submittedAt: string;
  locale: Locale;
  source: "visit-card";
  contact: {
    name: string;
    email: string;
    organisation: string;
    website: string;
  };
  project: {
    message: string;
    problem: ProjectProblemKey | "";
  };
  diagnostic: {
    requested: boolean;
    focus: ProjectProblemKey | "";
    context: string;
  };
  acquisition: AcquisitionContext;
  consent: {
    replyRequested: true;
    marketing: false;
  };
};

export type ConversationSubmissionResult =
  | { kind: "submitted" }
  | { kind: "email-fallback"; href: string };

const CONTEXT_KEY = "gwb:funnel-context:v1";
const SESSION_KEY = "gwb:session-id:v1";
const CONTACT_EMAIL = "garywilfredborilla@gmail.com";
const isProblemKey = (value: string | null): value is ProjectProblemKey =>
  Boolean(value && PROJECT_PROBLEM_KEYS.includes(value as ProjectProblemKey));

const safeRead = <T,>(storage: Storage, key: string): T | null => {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch {
    return null;
  }
};

const safeWrite = (storage: Storage, key: string, value: unknown) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in strict privacy modes. The form still works.
  }
};

const getSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const urlWithoutQuery = (value: string) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
};

const getSessionId = () => {
  if (typeof window === "undefined") return "server";
  const storage = getSessionStorage();
  if (!storage) return createId();
  const existing = storage.getItem(SESSION_KEY);
  if (existing) return existing;
  const sessionId = createId();
  try {
    storage.setItem(SESSION_KEY, sessionId);
  } catch {
    // The in-memory identifier remains valid for this submission.
  }
  return sessionId;
};

export const rememberProjectProblem = (problem: ProjectProblemKey) => {
  if (typeof window === "undefined") return;
  const storage = getSessionStorage();
  if (!storage) return;
  const current = safeRead<Partial<AcquisitionContext>>(storage, CONTEXT_KEY) || {};
  safeWrite(storage, CONTEXT_KEY, { ...current, problem });
};

export const captureFunnelContext = (): AcquisitionContext => {
  if (typeof window === "undefined") {
    return {
      source: "", medium: "", campaign: "", content: "", term: "",
      referrer: "", landingPage: "", sessionId: "server", problem: "",
    };
  }

  const storage = getSessionStorage();
  const stored = storage ? safeRead<Partial<AcquisitionContext>>(storage, CONTEXT_KEY) || {} : {};
  const params = new URLSearchParams(window.location.search);
  const queryProblem = params.get("problem");
  const context: AcquisitionContext = {
    source: params.get("utm_source") || stored.source || "",
    medium: params.get("utm_medium") || stored.medium || "",
    campaign: params.get("utm_campaign") || stored.campaign || "",
    content: params.get("utm_content") || stored.content || "",
    term: params.get("utm_term") || stored.term || "",
    referrer: stored.referrer || urlWithoutQuery(document.referrer),
    landingPage: stored.landingPage || `${window.location.origin}${window.location.pathname}`,
    sessionId: stored.sessionId || getSessionId(),
    problem: isProblemKey(queryProblem) ? queryProblem : isProblemKey(stored.problem || null) ? stored.problem as ProjectProblemKey : "",
  };

  if (storage) safeWrite(storage, CONTEXT_KEY, context);
  return context;
};

export const createProjectConversationPayload = (
  locale: Locale,
  values: Omit<ProjectConversationPayload, "schemaVersion" | "eventType" | "eventId" | "correlationId" | "submittedAt" | "locale" | "source" | "acquisition" | "consent">,
): ProjectConversationPayload => {
  const acquisition = captureFunnelContext();
  return {
    schemaVersion: "1.1",
    eventType: "project.conversation.submitted",
    eventId: createId(),
    correlationId: acquisition.sessionId,
    submittedAt: new Date().toISOString(),
    locale,
    source: "visit-card",
    ...values,
    acquisition,
    consent: { replyRequested: true, marketing: false },
  };
};

const buildEmailFallback = (payload: ProjectConversationPayload) => {
  const diagnostic = payload.diagnostic.requested
    ? `\n\nPremière lecture demandée : oui\nPoint à regarder : ${payload.diagnostic.focus || payload.project.problem || "à déterminer"}\nContexte complémentaire : ${payload.diagnostic.context || "non renseigné"}`
    : "\n\nPremière lecture demandée : non";
  const body = `Bonjour Gary,\n\n${payload.project.message}\n\nNom : ${payload.contact.name}\nEmail : ${payload.contact.email}\nOrganisation : ${payload.contact.organisation || "non renseignée"}\nSite ou lien : ${payload.contact.website || "non renseigné"}\nProblème repéré : ${payload.project.problem || "à déterminer"}${diagnostic}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Parler de mon projet")}&body=${encodeURIComponent(body)}`;
};

export const submitProjectConversation = async (
  payload: ProjectConversationPayload,
): Promise<ConversationSubmissionResult> => {
  if (isPublicApiConfigured) {
    await postPublicApi(PUBLIC_API_ROUTES.projectConversations, payload);
    return { kind: "submitted" };
  }
  if (isN8nProjectConversationConfigured) {
    await postN8nWebhook(n8nWebhookUrls.projectConversation, payload);
    return { kind: "submitted" };
  }
  return { kind: "email-fallback", href: buildEmailFallback(payload) };
};
