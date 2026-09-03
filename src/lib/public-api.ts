export const PUBLIC_API_ROUTES = {
  health: "/health",
  projectConversations: "/v1/project-conversations",
  masterclassRegistrations: "/v1/masterclass/registrations",
  engagementEvents: "/v1/events",
} as const;

const REQUEST_TIMEOUT_MS = 12_000;
const CLIENT_VERSION = "visit-card/1.1";
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "");

export const isPublicApiConfigured = Boolean(apiBaseUrl);

export const n8nWebhookUrls = {
  projectConversation: (process.env.NEXT_PUBLIC_N8N_PROJECT_CONVERSATION_WEBHOOK_URL || "").trim(),
  masterclassRegistration: (process.env.NEXT_PUBLIC_N8N_MASTERCLASS_REGISTRATION_WEBHOOK_URL || "").trim(),
  engagementEvent: (process.env.NEXT_PUBLIC_N8N_EVENT_WEBHOOK_URL || "").trim(),
} as const;

export const isN8nProjectConversationConfigured = Boolean(n8nWebhookUrls.projectConversation);

export type PublicApiAccepted = {
  accepted: true;
  eventId: string;
  requestId?: string;
};

type PublicApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    requestId?: string;
    retryable?: boolean;
  };
};

export class PublicApiError extends Error {
  status: number;
  code: string;
  requestId?: string;
  retryable: boolean;

  constructor(message: string, options: { status: number; code?: string; requestId?: string; retryable?: boolean }) {
    super(message);
    this.name = "PublicApiError";
    this.status = options.status;
    this.code = options.code || "request_failed";
    this.requestId = options.requestId;
    this.retryable = options.retryable ?? options.status >= 500;
  }
}

const readJson = async <T,>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  try {
    return await response.json() as T;
  } catch {
    return null;
  }
};

const postJson = async <TBody extends { eventId: string }>(
  url: string,
  body: TBody,
  headers: Record<string, string>,
): Promise<PublicApiAccepted> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const payload = await readJson<PublicApiAccepted & PublicApiErrorPayload>(response);
    if (!response.ok) {
      throw new PublicApiError(payload?.error?.message || `Delivery endpoint returned ${response.status}`, {
        status: response.status,
        code: payload?.error?.code,
        requestId: payload?.error?.requestId,
        retryable: payload?.error?.retryable,
      });
    }

    return {
      accepted: true,
      eventId: payload?.eventId || body.eventId,
      requestId: payload?.requestId,
    };
  } catch (error) {
    if (error instanceof PublicApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new PublicApiError("Delivery request timed out", { status: 0, code: "request_timeout", retryable: true });
    }
    throw new PublicApiError("Delivery endpoint is unreachable", { status: 0, code: "network_error", retryable: true });
  } finally {
    window.clearTimeout(timeout);
  }
};

export const postN8nWebhook = async <TBody extends { eventId: string }>(
  webhookUrl: string,
  body: TBody,
) => postJson(webhookUrl, body, {});

export const postPublicApi = async <TBody extends { eventId: string }>(
  route: string,
  body: TBody,
): Promise<PublicApiAccepted> => {
  if (!apiBaseUrl) throw new PublicApiError("Public API is not configured", { status: 0, code: "api_not_configured", retryable: false });
  return postJson(`${apiBaseUrl}${route}`, body, {
    "Idempotency-Key": body.eventId,
    "X-Client-Version": CLIENT_VERSION,
  });
};
