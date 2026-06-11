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
    image: "/images/modulos/01-como-funciona",
    alt: "Diagrama da plataforma Multipost: equipe, agendamento, painel de redes sociais e publicação automática",
  },
  {
    number: "02",
    title: "Instalação e Atualização",
    subtitle: "Do zero ao servidor rodando",
    description:
      "Instale o Multipost do zero no seu VPS com Docker passo a passo. Aprenda também como manter a ferramenta sempre atualizada sem perder suas configurações.",
    image: "/images/modulos/02-instalacao",
    alt: "Instalação e atualização do Multipost no VPS com Docker",
  },
  {
    number: "03",
    title: "Redes Sociais",
    subtitle: "Instagram, LinkedIn, YouTube, X e mais",
    description:
      "Conecte Instagram, Facebook, Threads, LinkedIn, YouTube e X (Twitter) passo a passo: criação de apps, OAuth e tokens. Aprenda também a usar a Zernio API para liberar dezenas redes sociais sem complicação.",
    image: "/images/modulos/03-redes-sociais",
    alt: "Conexão das redes sociais Instagram, Facebook, LinkedIn, YouTube, X e Threads via OAuth",
  },
  {
    number: "04",
    title: "Repost",
    subtitle: "Replicação automática de posts",
    description:
      "Postou no Instagram? O Repost replica automaticamente para suas outras redes sociais, no estilo Repostify. Configure uma vez e cada publicação vira conteúdo em todos os canais ao mesmo tempo.",
    image: "/images/modulos/04-repost",
    alt: "Repost replicando um post do Instagram para todas as outras redes sociais",
  },
  {
    number: "05",
    title: "Conteúdo com IA",
    subtitle: "Agente, persona, imagem e vídeo",
    description:
      "Crie conteúdo com inteligência artificial: configure o Agente de IA e a Persona da sua marca, gere imagens e vídeos com IA e use o IA Search para buscar na web e fazer scraping de referências.",
    image: "/images/modulos/05-conteudo-ia",
    alt: "Criação de conteúdo com IA: agente, persona, geração de imagem e vídeo e busca na web",
  },
  {
    number: "06",
    title: "Automação 'EU QUERO'",
    subtitle: "Comentários e DM automáticos",
    description:
      "Crie automações no estilo ManyChat: responda comentários automaticamente e envie mensagens na DM com link ou botão. Transforme cada interação em oportunidade de venda sem esforço manual.",
    image: "/images/modulos/06-automacao",
    alt: "Automação de comentários e DM no estilo ManyChat com link e botão",
  },
  {
    number: "07",
    title: "API & MCP para Agentes",
    subtitle: "n8n, MCP e agentes de IA",
    description:
      "Integre o Multipost via API: use no n8n com template pronto para download e conecte a agentes de IA como Claude, Hermes Agente e Openclaw através do MCP para publicar de forma autônoma.",
    image: "/images/modulos/07-api-mcp",
    alt: "Integração via API e MCP com n8n, Claude, Hermes Agente e Openclaw",
  },
  {
    number: "08",
    title: "Recursos Avançados",
    subtitle: "Logs, multi-cliente e aprovação",
    description:
      "Use o Temporal UI para monitorar filas e debugar publicações com logs avançados. Configure múltiplos clientes em uma só instalação e envie o link de um post para o cliente aprovar antes de publicar.",
    image: "/images/modulos/08-recursos-avancados",
    alt: "Recursos avançados: Temporal UI, logs, multi-cliente e fluxo de aprovação",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="training-card relative shrink-0 flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        width: "clamp(258px, 72vw, 392px)",
        height: "clamp(460px, 70vh, 560px)",
        background: "rgba(12,12,12,0.97)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — top of card, preserves the 4:3 infographic, no crop */}
      <div className="relative shrink-0 overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <picture>
          <source srcSet={`${step.image}.avif`} type="image/avif" />
          <img
            src={`${step.image}.webp`}
            alt={step.alt}
            width={880}
            height={660}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        </picture>
        {/* Fade the image into the card body */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(12,12,12,0.97) 0%, rgba(12,12,12,0.5) 45%, transparent 100%)",
          }}
        />
        {/* Number badge */}
        <span
          className="absolute left-3.5 top-3.5 flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 font-display text-xs font-bold tracking-widest transition-colors duration-500"
          style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: hovered ? "var(--color-accent-text,#f06365)" : "#e5e5e5",
          }}
        >
          {step.number}
        </span>
      </div>

      {/* Hover glow + accent border */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(205,40,43,0.22) 0%, rgba(205,40,43,0.06) 40%, transparent 70%)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 z-20"
        style={{ border: "1px solid rgba(205,40,43,0.2)", opacity: hovered ? 1 : 0 }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-6 lg:p-7">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 transition-colors duration-500"
          style={{ color: hovered ? "var(--color-accent-text,#f06365)" : "#a3a3a3" }}
        >
          {step.subtitle}
        </p>
        <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight tracking-tight">
          {step.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-neutral-400 line-clamp-3">
          {step.description}
        </p>

        <div className="mt-auto flex items-center gap-[6px] pt-4">
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
              8 módulos. Do zero ao multi-cliente, com IA, automações e API.<br /> Ao final, você terá seu próprio agendador de redes sociais rodando no seu servidor.
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
