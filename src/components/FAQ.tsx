"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-medium text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Perguntas{" "}
            <span className="text-gradient">frequentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
