"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "calendario",
    title: "Calendário Inteligente",
    description:
      "Agende e publique suas postagens de redes sociais em vários canais simultaneamente.",
    video: "/videos/1.mp4",
  },
  {
    id: "criacao-ia",
    title: "Criação com IA",
    description:
      "Melhore seu processo de criação de conteúdo com um agente de IA.",
    video: "/videos/2.mp4",
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Métricas detalhadas de cada canal. Engajamento, alcance e crescimento — tudo em dashboards interativos.",
    video: "/videos/5.mp4",
  },
  {
    id: "acoes-automaticas",
    title: "Ações automáticas",
    description:
      "O Multipost publicará, curtirá e comentará automaticamente quando você atingir uma meta específica, para que você possa obter o máximo engajamento para o seu conteúdo.",
    video: "/videos/4.mp4",
  },
  {
    id: "automacao",
    title: "Automação Total",
    description:
      "API pública + webhooks para integrar com n8n, Make ou Zapier. Publique automaticamente com fluxos inteligentes.",
    video: "/videos/6.mp4",
  },
  {
    id: "equipe",
    title: "Gestão de Equipe",
    description:
      "Multi-tenancy, fluxos de aprovação, permissões por papel. Escale com segurança para agências e times.",
    video: "/videos/3.mp4",
  },
];

/* ─── Feature list item (left panel) ────────────────────────── */
function FeatureListItem({
  feature,
  index,
  isActive,
  isLast,
  onClick,
}: {
  feature: (typeof features)[0];
  index: number;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative py-8 cursor-pointer" onClick={onClick}>
      {/* Top border */}
      <div
        className="absolute top-0 inset-x-0 h-px transition-colors duration-500"
        style={{
          backgroundColor: isActive
            ? "rgba(205,40,43,0.5)"
            : "rgba(255,255,255,0.07)",
        }}
      />

      <div className="flex items-start gap-5">
        {/* Number */}
        <span
          className="pt-0.5 font-display text-xs font-bold tracking-widest transition-colors duration-500 shrink-0 tabular-nums"
          style={{
            color: isActive
              ? "var(--color-accent-text,#f06365)"
              : "#a3a3a3",
          }}
        >
          0{index + 1}
        </span>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className="font-display text-xl sm:text-2xl font-semibold leading-snug tracking-tight transition-all duration-500"
            style={{
              color: isActive ? "#fff" : "#a3a3a3",
            }}
          >
            {feature.title}
          </h3>

          {/* Expandable description */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: isActive ? "200px" : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Active dot */}
        <div
          className="mt-2 shrink-0 h-2 w-2 rounded-full transition-all duration-500 blur-[1px]"
          style={{
            background: isActive ? "var(--color-accent,#cd282b)" : "transparent",
            boxShadow: isActive
              ? "0 0 12px var(--color-accent,#cd282b)"
              : "none",
          }}
        />
      </div>

      {/* Bottom border for last item */}
      {isLast && (
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.07]" />
      )}
    </div>
  );
}

/* ─── Individual video item (right panel) ────────────────────── */
function VideoItem({
  feature,
  index,
  isFirst,
  isLast,
  onActiveChange,
  wrapperRef,
}: {
  feature: (typeof features)[0];
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onActiveChange: (index: number, active: boolean) => void;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ratio, setRatio] = useState(16 / 9);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActiveChange(index, true);
          if (video.paused) {
            video.currentTime = 0;
            video.play().catch(() => { });
          }
        } else {
          onActiveChange(index, false);
          video.pause();
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [index, onActiveChange]);

  const handleMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.videoWidth && v.videoHeight) {
      setRatio(v.videoWidth / v.videoHeight);
    }
  };

  return (
    <div
      ref={wrapperRef as React.RefObject<HTMLDivElement>}
      className={`relative w-full overflow-hidden transition-all duration-700 bg-white/[0.02] ${isFirst ? "mt-[20vh]" : ""
        } ${isLast ? "mb-[20vh]" : "mb-[30vh]"
        }`}
      style={{
        aspectRatio: ratio.toString(),
        borderRadius: "2rem 0 0 2rem",
      }}
    >
      {/* Video - Touching the right edge */}
      <video
        ref={videoRef}
        src={feature.video}
        muted
        playsInline
        loop
        aria-hidden="true"
        onLoadedMetadata={handleMetadata}
        preload={isFirst ? "auto" : "none"}
        className="w-full h-full object-cover block"
      />

      {/* Bottom label overlay */}
      <div
        className="absolute bottom-0 inset-x-0 py-6 px-8 flex items-center gap-4 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
        }}
      >
        <span
          className="text-xs font-black tabular-nums px-3 py-1 rounded-full"
          style={{
            color: "#fff",
            background: "var(--color-accent,#cd282b)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-sm font-bold text-white tracking-tight uppercase">
          {feature.title}
        </span>
        <div className="ml-auto h-0.5 w-12 bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-white/40 transition-all duration-500 ease-out"
            style={{ width: `${((index + 1) / features.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile card ────────────────────────────────────────────── */
function MobileFeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="space-y-6">
      <div className="flex items-center gap-4">
        <span
          className="text-sm font-black tracking-widest"
          style={{ color: "var(--color-accent-text,#f06365)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-xl font-bold text-white">
          {feature.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-neutral-400">
        {feature.description}
      </p>
      <div className="rounded-2xl overflow-hidden bg-white/5">
        <video
          ref={videoRef}
          src={feature.video}
          muted
          playsInline
          loop
          aria-hidden="true"
          preload="none"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(React.RefObject<HTMLDivElement | null>)[]>(
    features.map(() => ({ current: null }))
  );

  const handleActiveChange = useCallback(
    (index: number, active: boolean) => {
      if (active) setActiveIndex(index);
    },
    []
  );

  const scrollToVideo = useCallback((index: number) => {
    videoRefs.current[index]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: 1,
          },
        }
      );
    }, sectionRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="funcionalidades"
      data-section="features"
      className="bg-transparent"
    >
      {/* ── Heading ─────────────────────────────────────────── */}
      <div className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={headingRef}
            className="flex flex-col items-center text-center"
          >
            <div className="space-y-4">
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl max-w-4xl leading-[1.1]">
                Gerenciar várias redes sociais ficou mais fácil
              </h2>
              <p className="max-w-3xl text-lg sm:text-xl text-neutral-400 font-medium mx-auto">
                O Multipost oferece tudo o que você precisa para gerenciar suas postagens nas redes sociais, para expandir seus negócios mais rapidamente com IA. Aqui, você instala no seu servidor e é dono de tudo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop Layout ──────────────────────────────────── */}
      <div className="hidden lg:flex items-start w-full">
        {/* Left: Sticky List */}
        <div
          className="sticky top-0 h-screen flex items-center shrink-0"
          style={{
            width: "38%",
            paddingLeft: "calc((100vw - 80rem) / 2 + 1.5rem)",
            paddingRight: "4rem",
          }}
        >
          <div className="w-full">
            {features.map((feature, i) => (
              <FeatureListItem
                key={feature.id}
                feature={feature}
                index={i}
                isActive={activeIndex === i}
                isLast={i === features.length - 1}
                onClick={() => scrollToVideo(i)}
              />
            ))}
          </div>
        </div>

        {/* Right: Scrolling Videos (Full-width to the edge) */}
        <div className="flex-1">
          {features.map((feature, i) => (
            <VideoItem
              key={feature.id}
              feature={feature}
              index={i}
              isFirst={i === 0}
              isLast={i === features.length - 1}
              onActiveChange={handleActiveChange}
              wrapperRef={videoRefs.current[i]}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile Layout ───────────────────────────────────── */}
      <div className="lg:hidden px-6 pb-24 space-y-20">
        {features.map((feature, i) => (
          <MobileFeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
