"use client";

import { motion } from "framer-motion";
import { Clock, CreditCard, Ban, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Tempo desperdiçado",
    description:
      "Você gasta horas por dia abrindo cada rede social, criando posts manualmente e repetindo o mesmo conteúdo em plataformas diferentes.",
  },
  {
    icon: CreditCard,
    title: "Ferramentas caras",
    description:
      "Hootsuite, Buffer, mLabs... Todas cobram mensalidade que só aumenta. R$100, R$200, R$500/mês — e seus dados ficam na mão deles.",
  },
  {
    icon: Ban,
    title: "Limitações absurdas",
    description:
      "Limite de perfis, limite de posts, limite de membros na equipe. Cada recurso extra é um upsell. Você nunca tem controle total.",
  },
  {
    icon: AlertTriangle,
    title: "Zero integração real",
    description:
      "Tentar conectar com n8n, Make ou automações customizadas? Boa sorte. APIs limitadas e webhooks inexistentes na maioria.",
  },
];

export default function Problem() {
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
            Gerenciar redes sociais virou um{" "}
            <span className="text-red-400">pesadelo</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Se você se identifica com algum desses problemas, o Robô MultiPost
            foi feito para você.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-red-500/10 bg-red-500/5 p-6"
            >
              <problem.icon className="h-8 w-8 text-red-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                {problem.title}
              </h3>
              <p className="mt-2 text-gray-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
