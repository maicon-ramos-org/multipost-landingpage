"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Calendário Inteligente",
    description:
      "Arraste e solte posts no calendário visual. Veja toda sua estratégia de conteúdo em uma timeline unificada.",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    visual: "calendar",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Planning.3f9ff858.png&w=1920&q=75",
  },
  {
    title: "IA para Conteúdo",
    description:
      "Framework Mastra + MCP integrado. Gere textos, adapte tom de voz, crie variações para cada rede automaticamente.",
    span: "col-span-1",
    visual: "ai",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Creating.f4022706.png&w=1080&q=75",
  },
  {
    title: "Analytics em Tempo Real",
    description:
      "Métricas detalhadas de cada canal. Engajamento, alcance e crescimento — tudo em dashboards interativos.",
    span: "col-span-1",
    visual: "analytics",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Analytics.d1755132.png&w=1920&q=75",
  },
  {
    title: "Multi-tenancy & Equipe",
    description:
      "Gerencie múltiplos clientes com organizações separadas. Permissões, aprovações e fluxos profissionais.",
    span: "col-span-1",
    visual: "team",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Organizing.bae04955.png&w=1080&q=75",
  },
  {
    title: "Docker & Self-Hosted",
    description:
      "Deploy em minutos com Docker Compose. Next.js, NestJS, PostgreSQL, Redis e Temporal.io no seu servidor.",
    span: "col-span-1",
    visual: "docker",
    screenshot: null,
  },
  {
    title: "API & Webhooks Completos",
    description:
      "API pública para integrar com n8n, Make, Zapier ou qualquer automação. Webhooks em tempo real.",
    span: "col-span-1 md:col-span-2",
    visual: "api",
    screenshot:
      "https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpost-web.69922432.png&w=1920&q=75",
  },
];

function ScreenshotVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/5">
      <div className="flex items-center gap-1.5 bg-white/[0.02] px-3 py-1.5">
        <div className="h-2 w-2 rounded-full bg-red-500/40" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
        <div className="h-2 w-2 rounded-full bg-green-500/40" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="feature-img w-full transition-transform duration-500 ease-out"
        loading="lazy"
      />
    </div>
  );
}

function DockerVisual() {
  return (
    <div className="mt-4 rounded-lg border border-white/5 bg-black/40 px-3 py-2 font-mono">
      <p className="text-[10px] text-gray-500">$ docker compose up -d</p>
      <p className="mt-1 text-[10px] text-emerald-400/70">✓ multipost-web</p>
      <p className="text-[10px] text-emerald-400/70">✓ multipost-api</p>
      <p className="text-[10px] text-emerald-400/70">
        ✓ postgres &bull; redis
      </p>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = (e.currentTarget as HTMLElement);
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 5,
      rotateX: -y * 5,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    gsap.to(e.currentTarget as HTMLElement, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

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

      // Cards with clip-path reveal
      const cards = gridRef.current!.querySelectorAll(".feature-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          clipPath: "inset(100% 0% 0% 0%)",
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
          delay: i * 0.1,
        });

        // Internal image parallax
        const img = card.querySelector(".feature-img");
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // 3D tilt on mouse (desktop)
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          (card as HTMLElement).style.perspective = "800px";
          (card as HTMLElement).style.transformStyle = "preserve-3d";
          card.addEventListener("mousemove", handleMouseMove as EventListener);
          card.addEventListener("mouseleave", handleMouseLeave as EventListener);

          return () => {
            card.removeEventListener("mousemove", handleMouseMove as EventListener);
            card.removeEventListener("mouseleave", handleMouseLeave as EventListener);
          };
        });
      });
    }, section);

    return () => ctx.revert();
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section ref={sectionRef} id="funcionalidades" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Tudo que você precisa,{" "}
            <span className="text-gradient">nada que não precisa</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Uma plataforma completa que rivais cobram centenas por mês. Aqui,
            você é dono de tudo.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`feature-card group glass gradient-border rounded-2xl p-6 transition-shadow duration-300 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-violet-600/10 will-change-transform ${feature.span}`}
              style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
              <h3 className="text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
              {feature.screenshot ? (
                <ScreenshotVisual
                  src={feature.screenshot}
                  alt={feature.title}
                />
              ) : (
                <DockerVisual />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
