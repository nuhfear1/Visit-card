import { getFaqCopy } from "@/lib/faq";
import type { Locale } from "@/lib/i18n";
import { sanitizeTextContent } from "@/lib/text-sanitize";

export const getSanitizedFaqCopy = (locale: Locale) =>
  sanitizeTextContent(getFaqCopy(locale));
