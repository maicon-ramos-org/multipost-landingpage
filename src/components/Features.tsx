"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Calendário Inteligente",
    description: "Arraste e solte posts no calendário visual. Veja toda sua estratégia de conteúdo em uma timeline unificada.",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    visual: "calendar",
  },
  {
    title: "IA para Conteúdo",
    description: "Framework Mastra + MCP integrado. Gere textos, adapte tom de voz, crie variações para cada rede automaticamente.",
    span: "col-span-1",
    visual: "ai",
  },
  {
    title: "Analytics em Tempo Real",
    description: "Métricas detalhadas de cada canal. Engajamento, alcance e crescimento — tudo em dashboards interativos.",
    span: "col-span-1",
    visual: "analytics",
  },
  {
    title: "Multi-tenancy & Equipe",
    description: "Gerencie múltiplos clientes com organizações separadas. Permissões, aprovações e fluxos profissionais.",
    span: "col-span-1",
    visual: "team",
  },
  {
    title: "Docker & Self-Hosted",
    description: "Deploy em minutos com Docker Compose. Next.js, NestJS, PostgreSQL, Redis e Temporal.io no seu servidor.",
    span: "col-span-1",
    visual: "docker",
  },
  {
    title: "API & Webhooks Completos",
    description: "API pública para integrar com n8n, Make, Zapier ou qualquer automação. Webhooks em tempo real.",
    span: "col-span-1 md:col-span-2",
    visual: "api",
  },
];

function CalendarVisual() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const posts = [
    { day: 0, color: "bg-violet-500/30 border-violet-500/40" },
    { day: 1, color: "bg-cyan-500/30 border-cyan-500/40" },
    { day: 2, color: "bg-violet-500/30 border-violet-500/40" },
    { day: 4, color: "bg-emerald-500/30 border-emerald-500/40" },
    { day: 5, color: "bg-cyan-500/30 border-cyan-500/40" },
  ];

  return (
    <div className="mt-6 grid grid-cols-7 gap-1.5">
      {days.map((d) => (
        <div key={d} className="text-center text-[10px] text-gray-600 font-medium">{d}</div>
      ))}
      {Array.from({ length: 14 }).map((_, i) => {
        const post = posts.find((p) => p.day === i % 7 && i < 7);
        return (
          <div
            key={i}
            className={`aspect-square rounded-md border transition-colors ${
              post
                ? `${post.color}`
                : "border-white/5 bg-white/[0.01]"
            }`}
          />
        );
      })}
    </div>
  );
}

function AIVisual() {
  return (
    <div className="mt-4 space-y-2">
      <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-3 py-2">
        <p className="text-[11px] text-violet-300">Gerando legenda...</p>
        <div className="mt-1 h-1.5 w-3/4 rounded-full bg-gradient-to-r from-violet-500/40 to-cyan-500/40 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
      </div>
      <div className="rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
        <p className="text-[11px] text-gray-400 line-clamp-2">&quot;Descubra como automatizar suas redes sociais com IA e publicar em 33+ canais...&quot;</p>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 65, 45, 80, 55, 90, 70];
  return (
    <div className="mt-4 flex items-end gap-1.5 h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="flex-1 rounded-sm bg-gradient-to-t from-violet-600/40 to-violet-400/20"
        />
      ))}
    </div>
  );
}

function TeamVisual() {
  return (
    <div className="mt-4 flex items-center -space-x-2">
      {["violet", "cyan", "emerald", "amber"].map((c, i) => (
        <div
          key={i}
          className={`h-8 w-8 rounded-full border-2 border-[#030014] bg-${c === "violet" ? "violet" : c === "cyan" ? "cyan" : c === "emerald" ? "emerald" : "amber"}-500/30 flex items-center justify-center text-[10px] font-bold text-gray-400`}
          style={{ backgroundColor: `rgba(${c === "violet" ? "139,92,246" : c === "cyan" ? "6,182,212" : c === "emerald" ? "16,185,129" : "245,158,11"},0.3)` }}
        >
          {["M", "A", "J", "R"][i]}
        </div>
      ))}
      <div className="h-8 w-8 rounded-full border-2 border-[#030014] bg-white/5 flex items-center justify-center text-[10px] text-gray-500">
        +5
      </div>
    </div>
  );
}

function DockerVisual() {
  return (
    <div className="mt-4 rounded-lg bg-black/40 border border-white/5 px-3 py-2 font-mono">
      <p className="text-[10px] text-gray-500">$ docker compose up -d</p>
      <p className="text-[10px] text-emerald-400/70 mt-1">✓ multipost-web</p>
      <p className="text-[10px] text-emerald-400/70">✓ multipost-api</p>
      <p className="text-[10px] text-emerald-400/70">✓ postgres &bull; redis</p>
    </div>
  );
}

function APIVisual() {
  return (
    <div className="mt-4 flex gap-3">
      <div className="flex-1 rounded-lg bg-black/40 border border-white/5 px-3 py-2 font-mono">
        <p className="text-[10px] text-cyan-400/70">POST /api/posts</p>
        <p className="text-[10px] text-gray-600 mt-1">{"{ channels: [...] }"}</p>
      </div>
      <div className="flex-1 rounded-lg bg-black/40 border border-white/5 px-3 py-2 font-mono">
        <p className="text-[10px] text-emerald-400/70">200 OK</p>
        <p className="text-[10px] text-gray-600 mt-1">{"{ published: true }"}</p>
      </div>
    </div>
  );
}

const visuals: Record<string, () => JSX.Element> = {
  calendar: CalendarVisual,
  ai: AIVisual,
  analytics: AnalyticsVisual,
  team: TeamVisual,
  docker: DockerVisual,
  api: APIVisual,
};

export default function Features() {
  return (
    <section id="funcionalidades" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Tudo que você precisa,{" "}
            <span className="text-gradient">nada que não precisa</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Uma plataforma completa que rivais cobram centenas por mês.
            Aqui, você é dono de tudo.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Visual = visuals[feature.visual];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group glass gradient-border rounded-2xl p-6 transition-all hover:bg-white/[0.04] ${feature.span}`}
              >
                <h3 className="text-base font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
                <Visual />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
