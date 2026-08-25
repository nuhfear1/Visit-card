import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Gary WILFRED-BORILLA",
  description: "Contact Gary WILFRED-BORILLA for digital strategy, SEO/SEA, social ads, copywriting, emailing and web projects.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-palette-grey overflow-hidden">
      <Contact />
    </main>
  );
}
