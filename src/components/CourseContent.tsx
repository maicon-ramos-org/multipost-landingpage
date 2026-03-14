"use client";

import { motion } from "framer-motion";
import {
  Server,
  Settings,
  Share2,
  Brain,
  Workflow,
  BarChart3,
  Users,
  Rocket,
} from "lucide-react";

const modules = [
  {
    icon: Server,
    number: "01",
    title: "Setup & Infraestrutura",
    topics: [
      "Escolhendo e configurando seu VPS",
      "Docker e Docker Compose na prática",
      "Deploy completo do Robô MultiPost",
      "Configuração de domínio e SSL",
    ],
  },
  {
    icon: Settings,
    number: "02",
    title: "Configuração Avançada",
    topics: [
      "PostgreSQL e Redis: tuning para produção",
      "Temporal.io: filas e agendamentos",
      "Variáveis de ambiente e segurança",
      "Backups automatizados",
    ],
  },
  {
    icon: Share2,
    number: "03",
    title: "Conectando Redes Sociais",
    topics: [
      "OAuth e tokens de cada plataforma",
      "Instagram & Facebook via Graph API",
      "LinkedIn, X, TikTok e YouTube",
      "Configurando 33+ canais",
    ],
  },
  {
    icon: Brain,
    number: "04",
    title: "IA & Geração de Conteúdo",
    topics: [
      "Framework Mastra + MCP",
      "Conectando ChatGPT, Claude e outros LLMs",
      "Gerando textos e adaptando tom de voz",
      "Prompts otimizados para redes sociais",
    ],
  },
  {
    icon: Workflow,
    number: "05",
    title: "Automações com n8n",
    topics: [
      "Instalando e conectando o n8n",
      "Webhooks e API do MultiPost",
      "Fluxos automáticos de publicação",
      "Integração com planilhas e CRMs",
    ],
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Analytics & Otimização",
    topics: [
      "Dashboard de métricas por canal",
      "Relatórios de engajamento",
      "Melhores horários para postar",
      "Estratégias baseadas em dados",
    ],
  },
  {
    icon: Users,
    number: "07",
    title: "Multi-tenancy & Equipe",
    topics: [
      "Estrutura de organizações e perfis",
      "Gerenciando múltiplos clientes",
      "Permissões e fluxo de aprovação",
      "White-label para agências",
    ],
  },
  {
    icon: Rocket,
    number: "08",
    title: "Produção & Escala",
    topics: [
      "Monitoramento e observabilidade",
      "Escalando para centenas de perfis",
      "Atualizações e manutenção",
      "Comunidade e suporte contínuo",
    ],
  },
];

export default function CourseContent() {
  return (
    <section id="conteudo" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            O que você vai{" "}
            <span className="text-gradient">aprender no curso</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            8 módulos completos — do zero ao deploy em produção, com IA e
            automações funcionando.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                  <mod.icon className="h-5 w-5 text-primary-400" />
                </div>
                <span className="text-sm font-bold text-primary-500">
                  Módulo {mod.number}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {mod.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {mod.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-sm text-gray-400"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-500" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
