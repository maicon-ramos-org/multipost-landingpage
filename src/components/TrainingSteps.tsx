"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Como funciona o Multipost",
    subtitle: "Visão geral da plataforma",
    description:
      "Entenda a arquitetura completa do Multipost: como o agendador funciona, como as filas processam as publicações e o que acontece por baixo dos panos em cada post.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <path d="M24 16v8l5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 24H8M40 24h-2M24 10V8M24 40v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Instalação e Atualização",
    subtitle: "Do zero ao servidor rodando",
    description:
      "Instale o Multipost do zero no seu VPS com Docker passo a passo. Aprenda também como manter a ferramenta sempre atualizada sem perder suas configurações.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="8" y="6" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M24 30v8" stroke="currentColor" strokeWidth="2" />
        <path d="M16 38h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 18l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Redes Sociais",
    subtitle: "Instagram, Facebook e Threads",
    description:
      "Configure o Instagram, Facebook e Threads passo a passo: criação de apps na Meta, OAuth, tokens de acesso e todas as permissões necessárias para publicar sem erros.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
        <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="36" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="36" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="38" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Recursos Avançados",
    subtitle: "Logs, multi-cliente e Late API",
    description:
      "Use o Temporal UI para monitorar filas e debugar publicações com logs avançados. Configure múltiplos clientes em uma só instalação e integre a Late API para escalar sua operação.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="6" y="10" width="36" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="21" width="36" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="32" width="36" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="13" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="24" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="35" r="2" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="training-card relative shrink-0 flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        width: "clamp(260px, 72vw, 440px)",
        height: "clamp(300px, 55vh, 490px)",
        background: "rgba(12,12,12,0.97)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at -5% -5%, rgba(205,40,43,0.28) 0%, rgba(205,40,43,0.08) 30%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ border: "1px solid rgba(205,40,43,0.18)", opacity: hovered ? 1 : 0 }}
      />

      <div className="relative z-10 flex flex-col h-full p-8 lg:p-9">
        <div className="flex items-start justify-between">
          <span
            className="font-display text-sm font-bold tracking-widest transition-colors duration-500"
            style={{ color: hovered ? "var(--color-accent-text,#f06365)" : "#a3a3a3" }}
          >
            {step.number}
          </span>
          <div
            className="w-16 h-16 transition-all duration-500"
            style={{
              color: hovered ? "var(--color-accent-text,#f06365)" : "rgba(255,255,255,0.1)",
              transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
            }}
          >
            {step.icon}
          </div>
        </div>

        <div className="mt-auto">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 transition-colors duration-500"
            style={{ color: hovered ? "var(--color-accent-text,#f06365)" : "#a3a3a3" }}
          >
            {step.subtitle}
          </p>
          <h3 className="font-display text-2xl lg:text-[1.7rem] font-bold text-white leading-tight tracking-tight">
            {step.title}
          </h3>
          <p className="mt-3 text-sm lg:text-[14px] leading-relaxed text-neutral-400">
            {step.description}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-[6px]">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i <= index ? "18px" : "5px",
                background: i <= index ? "var(--color-accent,#cd282b)" : "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function TrainingSteps() {
  // sectionRef — tall outer div, height set by JS (viewport + scroll distance)
  // stickyRef  — position:sticky top:0 h-screen overflow-hidden
  // trackRef   — flex row of cards, gets translateX via scroll progress
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // ── Setup: set section height based on track content width ────
    const setup = () => {
      const trackWidth = track.scrollWidth;
      const maxTrans = trackWidth - window.innerWidth;
      // Section height = viewport height + how far we need to scroll horizontally
      section.style.height = `${window.innerHeight + maxTrans}px`;
    };

    // ── Update: rAF-throttled scroll handler ──────────────────────
    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = rect.height;
      const viewportH = window.innerHeight;
      const scrollDist = sectionH - viewportH;   // total vertical scroll budget
      const scrolled = -rect.top;              // how much we've scrolled into section

      const progress = Math.max(0, Math.min(1, scrolled / scrollDist));
      const trackW = track.scrollWidth;
      const maxTrans = trackW - window.innerWidth;
      const translateX = -(progress * maxTrans);

      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    };

    setup();
    update(); // initial paint

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      setup();
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (section) section.style.height = "";
      if (track) track.style.transform = "";
    };
  }, []);


  const LEFT_PAD = "max(2rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <section id="treinamento" data-section="training">

      {/* ── DESKTOP ────────────────────────────────────────────────
          Outer div: height controlled by JS (viewport + scroll dist)
          Sticky inner: position:sticky top:0, clips overflow
          Track: flex row, translated by scroll progress
      ──────────────────────────────────────────────────────────── */}
      <div ref={sectionRef} className="relative">
        <div
          ref={stickyRef}
          className="sticky top-0 overflow-hidden flex flex-col"
          style={{ height: "100vh" }}
        >
          {/* Label — always visible at top of sticky area */}
          <div
            className="shrink-0 pt-8 lg:pt-14 pb-6 lg:pb-8 text-center"
            style={{ paddingLeft: LEFT_PAD, paddingRight: LEFT_PAD }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
              O Roadmap
            </p>
            <h2 className="font-display text-3xl sm:text-4xl xl:text-6xl font-bold tracking-tight leading-[1.05]">
              Como funciona{" "}
              <span className="text-accent-gradient">o treinamento</span>
            </h2>
            <p className="mt-3 text-neutral-400 text-sm lg:text-lg">
              8 aulas. Do zero ao multi-cliente em produção.  Ao final, você terá seu próprio agendador de redes sociais rodando no seu servidor.
            </p>
          </div>

          {/* Cards track — fills remaining height, translates on scroll */}
          <div className="flex-1 flex items-center overflow-visible">
            <div
              ref={trackRef}
              className="flex items-center gap-6 will-change-transform"
              style={{ paddingLeft: LEFT_PAD, paddingRight: "8rem", width: "max-content" }}
            >
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
