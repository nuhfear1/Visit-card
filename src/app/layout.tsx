import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gary WILFRED-BORILLA",
  description: "Personal brand experience — services, expertise and projects by Gary WILFRED-BORILLA.",
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
