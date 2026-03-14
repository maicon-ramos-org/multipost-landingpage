"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-0 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
            <Zap className="h-4 w-4" />
            Comunidade Automação Sem Limites
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Seu próprio{" "}
            <span className="text-gradient">Robô de Redes Sociais</span>{" "}
            com IA integrada
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
            Agende posts em{" "}
            <span className="font-semibold text-white">33+ canais</span>,
            gere conteúdo com IA e tenha controle total — rodando no{" "}
            <span className="font-semibold text-white">seu servidor</span>,
            sem mensalidade, compatível com{" "}
            <span className="font-semibold text-white">n8n</span>.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-600/25"
            >
              Quero o Robô MultiPost
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="text-sm text-gray-500">
              Por apenas <span className="font-bold text-primary-400">R$297</span> — acesso vitalício
            </span>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary-500" />
              Self-hosted &amp; Open Source
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary-500" />
              33+ redes sociais
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary-500" />
              IA integrada
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
