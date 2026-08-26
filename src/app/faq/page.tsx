import FaqView from "@/components/FaqView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("fr", "faq", "/faq");

export default function FaqPage() {
  return <FaqView />;
}
