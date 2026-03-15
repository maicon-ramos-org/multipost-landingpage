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

function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text slide in from left/right (bidirectional)
      gsap.fromTo(
        textRef.current,
        { x: isEven ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      // Video container slide in from opposite side (bidirectional)
      gsap.fromTo(
        videoContainerRef.current,
        { x: isEven ? 60 : -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      // Video scroll-scrub
      if (video) {
        const setupVideoScrub = () => {
          if (!video.duration) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
            onUpdate: (self) => {
              if (video.duration) {
                video.currentTime = self.progress * video.duration;
              }
            },
          });
        };

        if (video.readyState >= 1) {
          setupVideoScrub();
        } else {
          video.addEventListener("loadedmetadata", setupVideoScrub, { once: true });
        }
      }
    }, section);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={sectionRef}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
        isEven ? "" : "lg:[direction:rtl]"
      }`}
    >
      <div ref={textRef} className={isEven ? "" : "lg:[direction:ltr]"}>
        <span className="font-display text-sm font-bold uppercase tracking-widest text-accent">
          0{index + 1}
        </span>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {feature.title}
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-[#999]">
          {feature.description}
        </p>
      </div>

      <div ref={videoContainerRef} className={isEven ? "" : "lg:[direction:ltr]"}>
        <div className="rounded-xl border border-white/[0.08] bg-surface-raised overflow-hidden shadow-xl shadow-black/30">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="aspect-video bg-black">
            <video
              ref={videoRef}
              src={feature.video}
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
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
    <section ref={sectionRef} id="funcionalidades" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center mb-24">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Tudo que você precisa,{" "}
            <span className="text-accent-gradient">nada que não precisa</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#999]">
            Uma plataforma completa que rivais cobram centenas por mês. Aqui,
            você é dono de tudo.
          </p>
        </div>

        <div className="space-y-32 sm:space-y-40">
          {features.map((feature, i) => (
            <FeatureSection key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
