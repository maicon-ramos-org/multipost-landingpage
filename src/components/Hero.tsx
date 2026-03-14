"use client";

import { motion } from "framer-motion";

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

const socialIcons = [
  { name: "Instagram", x: "10%", y: "20%", delay: 0 },
  { name: "Youtube", x: "85%", y: "15%", delay: 0.5 },
  { name: "TikTok", x: "5%", y: "65%", delay: 1 },
  { name: "LinkedIn", x: "90%", y: "55%", delay: 1.5 },
  { name: "X", x: "15%", y: "85%", delay: 0.8 },
  { name: "Facebook", x: "80%", y: "80%", delay: 1.2 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/8 blur-[150px] animate-glow-pulse" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-violet-800/10 blur-[100px]" />

      {/* Floating social icons */}
      {socialIcons.map((icon) => (
        <motion.div
          key={icon.name}
          className="pointer-events-none absolute hidden opacity-20 lg:block"
          style={{ left: icon.x, top: icon.y }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://postiz.com/svgs/socials/${icon.name}.svg`}
            alt=""
            width={32}
            height={32}
            className="opacity-40"
            loading="lazy"
          />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Comunidade Automação Sem Limites
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Publique em{" "}
            <span className="text-gradient">todas as redes</span>
            <br className="hidden sm:block" />
            {" "}com um único clique
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            Agendador de redes sociais self-hosted com{" "}
            <span className="font-medium text-white">IA integrada</span>,{" "}
            <span className="font-medium text-white">33+ canais</span> e{" "}
            <span className="font-medium text-white">zero mensalidade</span>.
            Rode no seu servidor, automatize com n8n, escale sem limites.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
          >
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer group relative rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 px-10 py-4 text-lg font-bold text-white transition-all hover:shadow-2xl hover:shadow-violet-600/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Quero o Robô MultiPost
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-sm text-gray-500">
                Por apenas <span className="font-bold text-violet-400">R$297</span>
              </span>
              <span className="text-xs text-gray-600">Pagamento único &bull; Acesso vitalício</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <div className="gradient-border glow-violet rounded-2xl bg-[#030014] p-1.5">
            <div className="relative overflow-hidden rounded-xl bg-black/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                </div>
                <div className="mx-auto rounded-md bg-white/5 px-4 py-1 text-xs text-gray-500">
                  app.multipost.com.br
                </div>
              </div>
              
              {/* YouTube embed */}
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/YxMkANOFJsY?rel=0&modestbranding=1"
                  title="Robô MultiPost - Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
