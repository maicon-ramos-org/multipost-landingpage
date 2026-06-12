import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from "@/components/GoogleTagManager";
import TrackingProvider from "@/components/TrackingProvider";

// LenisProvider wraps {children}, so it must NOT disable SSR — otherwise the
// whole page renders client-only (blank HTML until JS loads). It server-renders
// children and only runs Lenis in a client effect, so default (ssr: true) is safe.
const LenisProvider = dynamic(() => import("@/components/LenisProvider"));
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robô MultiPost — Domine Todas as Redes Sociais com IA",
  description:
    "Treinamento completo para instalar e dominar o Robô MultiPost: agendador self-hosted de redes sociais com IA, 33+ canais e n8n. 8 módulos, 32+ videoaulas por R$297.",
  keywords: [
    "agendador de redes sociais",
    "automação redes sociais",
    "self-hosted",
    "multipost",
    "n8n",
    "docker",
    "IA",
    "inteligência artificial",
    "postiz",
    "social media scheduler",
  ],
  icons: {
    icon: "/images/postiz-icon.svg",
  },
  openGraph: {
    title: "Robô MultiPost — Domine Todas as Redes Sociais com IA",
    description:
      "Treinamento completo para instalar seu próprio agendador de redes sociais com IA. 8 módulos, 33+ canais, self-hosted. R$297 — 1 ano de acesso.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="font-body antialiased">
        {/* Preload the hero poster — it is the LCP element on mobile */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-poster.webp"
          fetchPriority="high"
        />
        {/* Warm up the Meta Pixel origin (script loaded afterInteractive) */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <a href="#hero" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium">
          Pular para o conteúdo
        </a>
        <GoogleTagManagerNoscript />
        <GoogleTagManagerScript />
        <TrackingProvider />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
