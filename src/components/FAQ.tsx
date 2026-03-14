"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Preciso saber programar para usar o Robô MultiPost?",
    answer:
      "Não! O curso foi desenhado para qualquer pessoa conseguir fazer o deploy. Você vai seguir um passo a passo completo com Docker, e tudo é feito via interface web. Porém, se você souber programar, terá ainda mais poder para customizar.",
  },
  {
    question: "Quanto custa manter o servidor rodando?",
    answer:
      "Um VPS básico (2GB RAM, 2 vCPU) custa entre R$30-50/mês e é suficiente para rodar o MultiPost com centenas de perfis. Muito menos do que qualquer ferramenta SaaS equivalente.",
  },
  {
    question: "O que acontece se eu não gostar do curso?",
    answer:
      "Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeito, é só pedir o reembolso pela Hotmart e devolvemos 100% do seu investimento.",
  },
  {
    question: "Qual a diferença do MultiPost para o Postiz original?",
    answer:
      "O Robô MultiPost é um fork do Postiz adaptado para o público brasileiro, com documentação em português, integrações extras, templates de automação para n8n e o curso completo ensinando tudo do zero.",
  },
  {
    question: "Funciona com n8n?",
    answer:
      "Sim! O MultiPost tem API pública e webhooks completos. No curso, há um módulo dedicado à integração com n8n, incluindo templates prontos de fluxos de automação.",
  },
  {
    question: "Quantas redes sociais posso conectar?",
    answer:
      "Não há limite. O sistema suporta 33+ canais nativamente e você pode conectar quantos perfis quiser. Instagram, Facebook, X, LinkedIn, TikTok, YouTube, Pinterest, e muito mais.",
  },
  {
    question: "A IA é gratuita ou preciso pagar?",
    answer:
      "A integração com IA usa o framework Mastra + MCP. Você pode conectar qualquer LLM — incluindo modelos gratuitos e open source. Se usar APIs pagas como OpenAI ou Claude, o custo é diretamente com o provedor (geralmente centavos por uso).",
  },
  {
    question: "Recebo atualizações futuras?",
    answer:
      "Sim! Ao comprar o curso, você tem acesso vitalício ao conteúdo e receberá todas as atualizações futuras sem custo adicional.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-6 font-medium text-white transition-colors group-hover:text-violet-300">
          {question}
        </span>
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all ${
            open ? "rotate-45 border-violet-500/30 bg-violet-500/10" : ""
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-400">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Perguntas{" "}
            <span className="text-gradient">frequentes</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Tudo que você precisa saber antes de começar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 glass gradient-border rounded-2xl px-6 sm:px-8"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
