import About from "@/components/About";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("fr", "services", "/about");

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-palette-grey">
      <About />
    </main>
  );
}
