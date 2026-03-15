"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    <div className="faq-item border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-6 font-medium text-white transition-colors group-hover:text-violet-300">
          {question}
        </span>
        <motion.div
          animate={{
            rotate: open ? 45 : 0,
            borderColor: open
              ? "rgba(139, 92, 246, 0.3)"
              : "rgba(255, 255, 255, 0.1)",
            backgroundColor: open
              ? "rgba(139, 92, 246, 0.1)"
              : "rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-gray-400"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headingRef.current!, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // FAQ items stagger from bottom
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".faq-item");
        gsap.from(items, {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div ref={headingRef} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Perguntas{" "}
            <span className="text-gradient">frequentes</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Tudo que você precisa saber antes de começar.
          </p>
        </div>

        <div
          ref={containerRef}
          className="mt-14 glass gradient-border rounded-2xl px-6 sm:px-8"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
