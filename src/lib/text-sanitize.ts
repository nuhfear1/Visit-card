export const removeEmDashes = (value: string): string =>
  value.replace(/\s*—\s*/g, ", ");

export function sanitizeTextContent<T>(value: T): T {
  if (typeof value === "string") return removeEmDashes(value) as T;

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeTextContent(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, sanitizeTextContent(item)])
    ) as T;
  }

  return value;
}
