"use client";

import { motion } from "framer-motion";
import { Briefcase, Code, Building, Workflow, Sparkles } from "lucide-react";

const audiences = [
  {
    icon: Briefcase,
    title: "Empreendedores",
    description:
      "Que querem parar de pagar ferramentas caras e ter controle total sobre suas publicações em redes sociais.",
  },
  {
    icon: Code,
    title: "Freelancers & Devs",
    description:
      "Que buscam uma solução técnica, customizável e que possa ser oferecida como serviço para clientes.",
  },
  {
    icon: Building,
    title: "Donos de Agência",
    description:
      "Que precisam gerenciar múltiplos clientes com multi-tenancy, aprovações e relatórios profissionais.",
  },
  {
    icon: Workflow,
    title: "Usuários de n8n",
    description:
      "Que querem integrar agendamento de posts nos seus fluxos de automação existentes via API e webhooks.",
  },
  {
    icon: Sparkles,
    title: "Entusiastas de Vibe Coding",
    description:
      "Que querem ter seu próprio SaaS de redes sociais rodando, aprender a arquitetura e customizar livremente.",
  },
];

export default function Audience() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Para quem é o{" "}
            <span className="text-gradient">Robô MultiPost</span>?
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <item.icon className="h-8 w-8 text-primary-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
