"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  springScale,
  checkPop,
  staggerFast,
  viewportOnce,
} from "@/lib/animations";
import type { Variants } from "framer-motion";

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

const included = [
  "Curso completo com 8 módulos",
  "Acesso vitalício ao conteúdo",
  "Código-fonte do Robô MultiPost",
  "Setup Docker pronto para produção",
  "Integração com IA configurada",
  "Templates de automação n8n",
  "Comunidade Automação Sem Limites",
  "Atualizações futuras inclusas",
  "Suporte na comunidade",
];

const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Pricing() {
  return (
    <section id="preco" className="relative py-20 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Invista uma vez,{" "}
            <span className="text-gradient">economize para sempre</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Enquanto outros pagam R$200+/mês em ferramentas limitadas, você
            investe uma única vez e tem controle total.
          </p>
        </motion.div>

        <motion.div
          variants={springScale}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-lg"
        >
          {/* Card */}
          <div className="gradient-border glow-violet-strong rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-10">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Acesso Completo
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-lg text-gray-600 line-through">R$597</span>
              <span className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                R$297
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Pagamento único &bull; Sem mensalidade &bull; Para sempre
            </p>

            {/* Divider */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Benefits */}
            <motion.ul
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-3.5"
            >
              {included.map((item) => (
                <motion.li
                  key={item}
                  variants={listItem}
                  className="flex items-start gap-3"
                >
                  <motion.svg
                    variants={checkPop}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0 text-violet-400"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -2,
                boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="btn-shimmer group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 py-4 text-lg font-bold text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Garantir Minha Vaga
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </motion.a>

            {/* Trust */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                7 dias de garantia
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                </svg>
                Acesso vitalício
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                Suporte incluso
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
