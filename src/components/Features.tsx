"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Image,
  Users,
  Brain,
  Webhook,
  Building2,
  Container,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Calendário Visual",
    description:
      "Agende posts arrastando e soltando no calendário. Visualize toda sua estratégia de conteúdo em um só lugar.",
  },
  {
    icon: BarChart3,
    title: "Analytics por Canal",
    description:
      "Métricas detalhadas de cada rede social integrada. Engajamento, alcance e crescimento em tempo real.",
  },
  {
    icon: Image,
    title: "Biblioteca de Mídia",
    description:
      "Upload centralizado de imagens e vídeos. Organize e reutilize sua mídia em qualquer post.",
  },
  {
    icon: Users,
    title: "Colaboração em Equipe",
    description:
      "Convide membros, atribua funções e aprove posts antes da publicação. Ideal para agências.",
  },
  {
    icon: Brain,
    title: "IA para Conteúdo",
    description:
      "Framework Mastra + MCP integrado. Gere textos, adapte tom de voz e crie variações para cada rede.",
  },
  {
    icon: Webhook,
    title: "API & Webhooks",
    description:
      "API pública completa e webhooks para integrar com n8n, Make, Zapier ou qualquer automação.",
  },
  {
    icon: Building2,
    title: "Multi-tenancy",
    description:
      "Estrutura Usuário > Organização > Perfil. Gerencie múltiplos clientes em uma única instalação.",
  },
  {
    icon: Container,
    title: "Docker & Self-Hosted",
    description:
      "Deploy com Docker Compose em minutos. Next.js, NestJS, PostgreSQL, Redis e Temporal.io.",
  },
];

export default function Features() {
  return (
    <section id="funcionalidades" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Tudo que você precisa,{" "}
            <span className="text-gradient">em um só lugar</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Uma plataforma completa de gerenciamento de redes sociais, com
            funcionalidades que rivais cobram centenas por mês.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-primary-500/20 hover:bg-primary-500/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
                <feature.icon className="h-5 w-5 text-primary-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
