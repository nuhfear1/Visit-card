import HomeV2 from "@/components/HomeV2";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("fr", "home", "/");

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <HomeV2 />
    </main>
  );
}
