import HomeV21 from "@/components/HomeV21";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("fr", "home", "/");

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <HomeV21 />
    </main>
  );
}
