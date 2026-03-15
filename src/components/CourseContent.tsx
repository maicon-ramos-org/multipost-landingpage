"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    number: "01",
    title: "Setup & Infraestrutura",
    description: "Do zero ao deploy completo no seu VPS com Docker.",
    topics: [
      "Escolhendo e configurando seu VPS",
      "Docker e Docker Compose na prática",
      "Deploy completo do Robô MultiPost",
      "Configuração de domínio e SSL",
    ],
  },
  {
    number: "02",
    title: "Configuração Avançada",
    description: "Tuning de banco, filas e segurança para produção.",
    topics: [
      "PostgreSQL e Redis: tuning para produção",
      "Temporal.io: filas e agendamentos",
      "Variáveis de ambiente e segurança",
      "Backups automatizados",
    ],
  },
  {
    number: "03",
    title: "Conectando Redes Sociais",
    description: "OAuth, tokens e configuração de 33+ canais.",
    topics: [
      "OAuth e tokens de cada plataforma",
      "Instagram & Facebook via Graph API",
      "LinkedIn, X, TikTok e YouTube",
      "Configurando 33+ canais",
    ],
  },
  {
    number: "04",
    title: "IA & Geração de Conteúdo",
    description: "Conecte LLMs e gere conteúdo otimizado automaticamente.",
    topics: [
      "Framework Mastra + MCP",
      "Conectando ChatGPT, Claude e outros LLMs",
      "Gerando textos e adaptando tom de voz",
      "Prompts otimizados para redes sociais",
    ],
  },
  {
    number: "05",
    title: "Automações com n8n",
    description: "Fluxos automáticos de publicação e integração.",
    topics: [
      "Instalando e conectando o n8n",
      "Webhooks e API do MultiPost",
      "Fluxos automáticos de publicação",
      "Integração com planilhas e CRMs",
    ],
  },
  {
    number: "06",
    title: "Analytics & Otimização",
    description: "Métricas, relatórios e estratégias baseadas em dados.",
    topics: [
      "Dashboard de métricas por canal",
      "Relatórios de engajamento",
      "Melhores horários para postar",
      "Estratégias baseadas em dados",
    ],
  },
  {
    number: "07",
    title: "Multi-tenancy & Equipe",
    description: "Gerencie múltiplos clientes em uma única instalação.",
    topics: [
      "Estrutura de organizações e perfis",
      "Gerenciando múltiplos clientes",
      "Permissões e fluxo de aprovação",
      "White-label para agências",
    ],
  },
  {
    number: "08",
    title: "Produção & Escala",
    description: "Monitoramento, escalabilidade e comunidade.",
    topics: [
      "Monitoramento e observabilidade",
      "Escalando para centenas de perfis",
      "Atualizações e manutenção",
      "Comunidade e suporte contínuo",
    ],
  },
];

function ModuleItem({
  mod,
  index,
}: {
  mod: (typeof modules)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Alternate slide from left/right
      const xFrom = index % 2 === 0 ? -40 : 40;
      gsap.from(ref.current!, {
        opacity: 0,
        x: xFrom,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        delay: index * 0.05,
      });

      // Dot pulse when reached
      if (dotRef.current) {
        ScrollTrigger.create({
          trigger: ref.current!,
          start: "top 60%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              dotRef.current!,
              { scale: 1 },
              {
                scale: 1.3,
                duration: 0.3,
                ease: "back.out(2)",
                yoyo: true,
                repeat: 1,
              }
            );
          },
        });
      }
    }, ref.current);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-start gap-5 py-5 text-left"
      >
        <div className="relative flex flex-col items-center">
          <div
            ref={dotRef}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all ${
              open
                ? "bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-600/20"
                : "bg-white/5 text-gray-500 group-hover:bg-violet-500/10 group-hover:text-violet-400"
            }`}
          >
            {mod.number}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white transition-colors group-hover:text-violet-300">
              {mod.title}
            </h3>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="shrink-0 text-gray-600"
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </div>
          <p className="mt-1 text-sm text-gray-500">{mod.description}</p>
        </div>
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
            <ul className="mb-4 ml-[60px] space-y-2.5 border-l border-violet-500/10 pl-5">
              {mod.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-2.5 text-sm text-gray-400"
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500/50" />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header slide from left
      gsap.from(headerRef.current!, {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Stats counters
      if (statsRef.current) {
        const items = statsRef.current.children;
        gsap.from(items, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Timeline line grows with scroll
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="conteudo" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr] lg:items-start">
          {/* Left side - header */}
          <div ref={headerRef} className="lg:sticky lg:top-32">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Do zero ao deploy{" "}
              <span className="text-gradient">em produção</span>
            </h2>
            <p className="mt-5 text-lg text-gray-400">
              8 módulos completos. Cada passo documentado, cada configuração
              explicada. Ao final, você terá seu próprio agendador de redes
              sociais rodando.
            </p>

            <div ref={statsRef} className="mt-8 flex items-center gap-6">
              {[
                { val: "8", label: "Módulos" },
                { val: "32+", label: "Aulas" },
                { val: "∞", label: "Acesso" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold text-white">
                    {item.val}
                  </div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - timeline */}
          <div className="relative">
            {/* Animated timeline line - grows with scroll */}
            <div
              ref={timelineLineRef}
              className="absolute left-[19px] top-[20px] bottom-[20px] w-px origin-top bg-gradient-to-b from-violet-500/30 via-violet-500/10 to-transparent will-change-transform"
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            />

            <div className="divide-y divide-white/5">
              {modules.map((mod, i) => (
                <ModuleItem key={mod.number} mod={mod} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
