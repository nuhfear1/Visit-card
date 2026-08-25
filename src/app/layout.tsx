import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gary WILFRED-BORILLA",
  description: "Gary WILFRED-BORILLA — stratégie & croissance, agents IA & automatisation, web & expériences digitales, marketing digital & communication.",
};

import Navbar from "@/components/Navbar";
import { PageTransitionProvider } from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <PageTransitionProvider>
          {children}
          <Navbar />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
