"use client";

import { motion } from "framer-motion";
import { Bot, Server, Brain, Infinity } from "lucide-react";

export default function Solution() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
            <Bot className="h-4 w-4" />A Solução
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Conheça o{" "}
            <span className="text-gradient">Robô MultiPost</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Um agendador de redes sociais completo que roda no{" "}
            <strong className="text-white">seu próprio servidor</strong>. Sem
            mensalidade, sem limites, com IA integrada e compatibilidade total
            com n8n e automações.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Server,
              title: "100% Self-Hosted",
              description:
                "Rode no seu VPS com Docker. Seus dados ficam com você. Sem dependência de terceiros, sem mensalidades surpresa.",
            },
            {
              icon: Brain,
              title: "IA Integrada",
              description:
                "Gere textos, hashtags e legendas com IA usando o framework Mastra + MCP. Conecte ao ChatGPT, Claude ou qualquer LLM.",
            },
            {
              icon: Infinity,
              title: "Sem Limites",
              description:
                "Perfis ilimitados, posts ilimitados, membros ilimitados. Escale quanto quiser sem pagar mais por isso.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glow-sm rounded-2xl border border-primary-500/10 bg-gradient-to-b from-primary-500/5 to-transparent p-8 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/10">
                <item.icon className="h-7 w-7 text-primary-400" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
