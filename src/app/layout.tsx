import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robô MultiPost — Domine Todas as Redes Sociais com IA",
  description:
    "Agende posts em 33+ redes sociais com IA integrada, Docker e n8n. Self-hosted, sem mensalidade, controle total. Curso completo por R$297.",
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
    icon: "https://raw.githubusercontent.com/maiconramos/robo-multipost/refs/heads/main/apps/frontend/public/postiz.svg",
  },
  openGraph: {
    title: "Robô MultiPost — Domine Todas as Redes Sociais com IA",
    description:
      "Agende posts em 33+ redes sociais com IA integrada. Self-hosted, sem mensalidade, controle total.",
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
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
