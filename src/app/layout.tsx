import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FxProvider } from "@/components/fx/FxProvider";
import MatrixRain from "@/components/fx/MatrixRain";
import Scanlines from "@/components/fx/Scanlines";
import ScrollProgress from "@/components/fx/ScrollProgress";
import CursorFollower from "@/components/fx/CursorFollower";
import KonamiEasterEgg from "@/components/fx/KonamiEasterEgg";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/CommandPalette";
import { site } from "@/data/site";

const jbMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.handle} — developer & cybersecurity student`,
    template: `%s — ${site.handle}`,
  },
  description:
    "Portfolio of Mohamed Amdjad Mehdi — developer and cybersecurity student at ESI-SBA. Projects, writeups and the arsenal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jbMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg font-mono text-fg">
        <FxProvider>
          <MatrixRain />
          <Scanlines />
          <ScrollProgress />
          <CursorFollower />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <CommandPalette />
          <KonamiEasterEgg />
        </FxProvider>
      </body>
    </html>
  );
}
