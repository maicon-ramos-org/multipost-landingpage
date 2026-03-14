"use client";

import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Infinity,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

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

export default function Pricing() {
  return (
    <section id="preco" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Invista uma vez,{" "}
            <span className="text-gradient">economize para sempre</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Enquanto outros pagam R$200+/mês em ferramentas limitadas, você
            investe uma única vez e tem controle total.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glow mx-auto mt-14 max-w-lg rounded-3xl border border-primary-500/20 bg-gradient-to-b from-primary-500/10 to-primary-950/20 p-8 sm:p-10"
        >
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-400">
              Acesso Completo
            </p>
            <div className="mt-4 flex items-baseline justify-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                R$597
              </span>
              <span className="text-5xl font-extrabold text-white sm:text-6xl">
                R$297
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Pagamento único — sem mensalidade
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-4 text-lg font-bold text-white transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-600/25"
          >
            Garantir Minha Vaga
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              7 dias de garantia
            </span>
            <span className="flex items-center gap-1.5">
              <Infinity className="h-3.5 w-3.5" />
              Acesso vitalício
            </span>
            <span className="flex items-center gap-1.5">
              <HeadphonesIcon className="h-3.5 w-3.5" />
              Suporte incluso
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
