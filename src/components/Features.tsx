"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Calendário Inteligente",
    description:
      "Arraste e solte posts no calendário visual. Veja toda sua estratégia de conteúdo em uma timeline unificada.",
    video: "https://postiz.com/videos/1.mp4",
  },
  {
    title: "IA para Conteúdo",
    description:
      "Framework Mastra + MCP integrado. Gere textos, adapte tom de voz, crie variações para cada rede automaticamente.",
    video: "https://postiz.com/videos/2.mp4",
  },
  {
    title: "Analytics em Tempo Real",
    description:
      "Métricas detalhadas de cada canal. Engajamento, alcance e crescimento — tudo em dashboards interativos.",
    video: "https://postiz.com/videos/3.mp4",
  },
  {
    title: "Múltiplas Contas",
    description:
      "Gerencie dezenas de perfis em uma única interface. Organizações separadas, permissões e aprovações.",
    video: "https://postiz.com/videos/4.mp4",
  },
  {
    title: "Automação Total",
    description:
      "API pública + webhooks para integrar com n8n, Make ou Zapier. Publique automaticamente com fluxos inteligentes.",
    video: "https://postiz.com/videos/5.mp4",
  },
  {
    title: "Gestão de Equipe",
    description:
      "Multi-tenancy, fluxos de aprovação, permissões por papel. Escale com segurança para agências e times.",
    video: "https://postiz.com/videos/6.mp4",
  },
];

function PinnedFeature({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const ctx = gsap.context(() => {
      // Pause video — scroll controls it
      video.pause();

      const setupPinnedSection = () => {
        if (!video.duration) return;

        // Main pinned ScrollTrigger
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            // Scrub video with scroll
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }

            // Progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });

        // Text entrance (bidirectional, tied to the section)
        gsap.fromTo(
          textRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.3,
            },
          }
        );

        // Number accent flash
        gsap.fromTo(
          numberRef.current,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 20%",
              scrub: 0.3,
            },
          }
        );
      };

      if (video.readyState >= 1) {
        setupPinnedSection();
      } else {
        video.addEventListener("loadedmetadata", setupPinnedSection, {
          once: true,
        });
      }
    }, section);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Full-bleed video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={feature.video}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/40" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-xl">
          <span
            ref={numberRef}
            className="font-display text-7xl font-extrabold text-accent/20 sm:text-8xl md:text-9xl"
          >
            0{index + 1}
          </span>
          <div ref={textRef}>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {feature.title}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">
              {feature.description}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left bg-accent will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Feature counter */}
      <div className="absolute bottom-6 right-6 z-10 font-display text-sm font-bold tracking-widest text-white/30">
        {String(index + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="funcionalidades" data-section="features">
      {/* Section heading */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={headingRef} className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Tudo que você precisa,{" "}
              <span className="text-accent-gradient">nada que não precisa</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#999]">
              Uma plataforma completa que rivais cobram centenas por mês. Aqui,
              você é dono de tudo.
            </p>
          </div>
        </div>
      </div>

      {/* Pinned video feature sections */}
      {features.map((feature, i) => (
        <PinnedFeature key={feature.title} feature={feature} index={i} />
      ))}
    </section>
  );
}
