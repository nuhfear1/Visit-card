import Contact from "@/components/Contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("fr", "contact", "/contact");

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-palette-grey overflow-hidden">
      <Contact />
    </main>
  );
}
