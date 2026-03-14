import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Robô MultiPost — Agendador de Redes Sociais Self-Hosted com IA",
  description:
    "Automatize suas postagens em 33+ redes sociais com IA integrada, Docker e compatibilidade com n8n. Controle total, sem mensalidade. Curso completo por R$297.",
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
    "social media",
  ],
  openGraph: {
    title: "Robô MultiPost — Agendador de Redes Sociais Self-Hosted com IA",
    description:
      "Automatize suas postagens em 33+ redes sociais com IA integrada. Controle total, sem mensalidade.",
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
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
