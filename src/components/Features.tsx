"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const features = [
  {
    title: "Calendário Inteligente",
    description:
      "Arraste e solte posts no calendário visual. Veja toda sua estratégia de conteúdo em uma timeline unificada.",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    visual: "calendar",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Planning.3f9ff858.png&w=1920&q=75",
  },
  {
    title: "IA para Conteúdo",
    description:
      "Framework Mastra + MCP integrado. Gere textos, adapte tom de voz, crie variações para cada rede automaticamente.",
    span: "col-span-1",
    visual: "ai",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Creating.f4022706.png&w=1080&q=75",
  },
  {
    title: "Analytics em Tempo Real",
    description:
      "Métricas detalhadas de cada canal. Engajamento, alcance e crescimento — tudo em dashboards interativos.",
    span: "col-span-1",
    visual: "analytics",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Analytics.d1755132.png&w=1920&q=75",
  },
  {
    title: "Multi-tenancy & Equipe",
    description:
      "Gerencie múltiplos clientes com organizações separadas. Permissões, aprovações e fluxos profissionais.",
    span: "col-span-1",
    visual: "team",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Organizing.bae04955.png&w=1080&q=75",
  },
  {
    title: "Docker & Self-Hosted",
    description:
      "Deploy em minutos com Docker Compose. Next.js, NestJS, PostgreSQL, Redis e Temporal.io no seu servidor.",
    span: "col-span-1",
    visual: "docker",
    screenshot: null,
  },
  {
    title: "API & Webhooks Completos",
    description:
      "API pública para integrar com n8n, Make, Zapier ou qualquer automação. Webhooks em tempo real.",
    span: "col-span-1 md:col-span-2",
    visual: "api",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpost-web.69922432.png&w=1920&q=75",
  },
];

function ScreenshotVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/5">
      {/* Mini browser chrome */}
      <div className="flex items-center gap-1.5 bg-white/[0.02] px-3 py-1.5">
        <div className="h-2 w-2 rounded-full bg-red-500/40" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
        <div className="h-2 w-2 rounded-full bg-green-500/40" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
}

function DockerVisual() {
  return (
    <div className="mt-4 rounded-lg border border-white/5 bg-black/40 px-3 py-2 font-mono">
      <p className="text-[10px] text-gray-500">$ docker compose up -d</p>
      <p className="mt-1 text-[10px] text-emerald-400/70">✓ multipost-web</p>
      <p className="text-[10px] text-emerald-400/70">✓ multipost-api</p>
      <p className="text-[10px] text-emerald-400/70">
        ✓ postgres &bull; redis
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="funcionalidades" className="relative py-20 sm:py-28">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Tudo que você precisa,{" "}
            <span className="text-gradient">nada que não precisa</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Uma plataforma completa que rivais cobram centenas por mês. Aqui,
            você é dono de tudo.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className={`group glass gradient-border rounded-2xl p-6 transition-shadow duration-300 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-violet-600/10 ${feature.span}`}
            >
              <h3 className="text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
              {feature.screenshot ? (
                <ScreenshotVisual
                  src={feature.screenshot}
                  alt={feature.title}
                />
              ) : (
                <DockerVisual />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
