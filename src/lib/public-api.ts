export const PUBLIC_API_ROUTES = {
  health: "/health",
  projectConversations: "/v1/project-conversations",
  masterclassRegistrations: "/v1/masterclass/registrations",
  engagementEvents: "/v1/events",
} as const;

const REQUEST_TIMEOUT_MS = 12_000;
const CLIENT_VERSION = "visit-card/1.0";
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "");

export const isPublicApiConfigured = Boolean(apiBaseUrl);

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

export const postPublicApi = async <TBody extends { eventId: string }>(
  route: string,
  body: TBody,
): Promise<PublicApiAccepted> => {
  if (!apiBaseUrl) throw new PublicApiError("Public API is not configured", { status: 0, code: "api_not_configured", retryable: false });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiBaseUrl}${route}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Idempotency-Key": body.eventId,
        "X-Client-Version": CLIENT_VERSION,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const payload = await readJson<PublicApiAccepted & PublicApiErrorPayload>(response);
    if (!response.ok) {
      throw new PublicApiError(payload?.error?.message || `Public API returned ${response.status}`, {
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
      throw new PublicApiError("Public API request timed out", { status: 0, code: "request_timeout", retryable: true });
    }
    throw new PublicApiError("Public API is unreachable", { status: 0, code: "network_error", retryable: true });
  } finally {
    window.clearTimeout(timeout);
  }
};
