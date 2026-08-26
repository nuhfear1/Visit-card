import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PageTransitionProvider } from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://nuhfear1.github.io/Visit-card/"),
  title: "Gary WILFRED-BORILLA",
  description: "Stratégie, IA, web et acquisition au service de problèmes concrets et de projets qui doivent avancer.",
  icons: {
    icon: [{ url: "/Visit-card/favicon.ico", type: "image/x-icon" }],
    shortcut: "/Visit-card/favicon.ico",
  },
  openGraph: {
    siteName: "Gary WILFRED-BORILLA",
    type: "website",
    images: [
      {
        url: "/Visit-card/gary-services.webp",
        width: 1200,
        height: 630,
        alt: "Gary WILFRED-BORILLA — stratégie, IA, web et acquisition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/Visit-card/gary-services.webp"],
  },
};

const localeBootstrap = `(() => {
  const first = location.pathname.replace('/Visit-card', '').split('/').filter(Boolean)[0];
  const map = { en: 'en-US', es: 'es-419', pt: 'pt-BR', gcf: 'gcf', ar: 'ar', ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR' };
  document.documentElement.lang = map[first] || 'fr-FR';
  document.documentElement.dir = first === 'ar' ? 'rtl' : 'ltr';
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-FR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootstrap }} />
      </head>
      <body className="antialiased">
        <PageTransitionProvider>
          {children}
          <Navbar />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
