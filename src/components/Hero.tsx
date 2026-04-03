"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Video scroll-scrub
      if (video) {
        video.pause();

        const setupVideoScrub = () => {
          if (!video.duration) return;

          ScrollTrigger.create({
            trigger: videoContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5,
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
          video.addEventListener("loadedmetadata", setupVideoScrub, {
            once: true,
          });
        }
      }

      // Text fade out on scroll (bidirectional)
      gsap.fromTo(
        [badgeRef.current, headlineRef.current, subtitleRef.current, ctaRef.current],
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -20,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        }
      );

      // Video reveal: scale up as it enters viewport
      gsap.fromTo(
        videoContainerRef.current,
        { scale: 0.92, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="relative overflow-hidden pt-6 md:pt-32 pb-0"
    >
      {/* Radial glow accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-accent/[0.07] blur-[160px]" />

      {/* Hero content */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="hero-entrance hero-entrance-delay-1 mb-6 flex md:inline-flex justify-center md:justify-start items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-xs text-neutral-300"
        >
          <svg
            className="w-3 h-3 text-accent"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
          </svg>
          Software Self-hosted
        </div>

        {/* Title row: huge title left, CTA bottom-right on desktop; stacked on mobile */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-8">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="hero-entrance hero-entrance-delay-2 font-display text-[1.9rem] leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-7xl xl:text-6xl md:max-w-[70%] text-center md:text-left"
          >
            A FERRAMENTA QUE{" "}
            <br />
            <span className="text-accent-gradient">AS AGÊNCIAS USAM</span>
            <br />
            AGORA É SUA
          </h1>

          {/* Subtitle — mobile only (between title and CTA) */}
          <p className="hero-entrance hero-entrance-delay-4 md:hidden text-sm leading-relaxed text-neutral-500 text-center">
            Gestão de redes sociais auto-hospedada para agências, empresas e criadores que desejam controle total.{" "}
            <span className="text-neutral-300">IA integrada</span>,{" "}
            <span className="text-neutral-300">+33 canais</span> e{" "}
            <span className="text-neutral-300">sem limites de planos</span>.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="hero-entrance hero-entrance-delay-3 flex flex-col items-center md:items-end gap-3 md:shrink-0 md:pb-2"
          >
            <a
              href="#preco"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#preco"); }}
              className="btn-shimmer group relative flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-t from-red-700 via-red-500 to-red-400 px-7 py-3.5 text-base font-bold text-white shadow-[0_0_40px_-5px_rgba(205,40,43,0.6)] ring-1 ring-inset ring-white/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-5px_rgba(205,40,43,0.8)] whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-2">
                Quero o Treinamento
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            <div className="flex flex-col items-center md:items-end">
              <span className="text-sm text-neutral-400">
                Por apenas{" "}
                <span className="font-bold text-accent-text">R$297</span>
              </span>
              <span className="text-xs text-neutral-400">
                Pagamento único &bull; Acesso vitalício
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle — desktop only, below title row */}
        <p
          ref={subtitleRef}
          className="hero-entrance hero-entrance-delay-4 hidden md:block mt-6 max-w-xl text-base leading-relaxed text-neutral-500"
        >
          Gestão de redes sociais auto-hospedada para agências, empresas e criadores que desejam controle total. <br></br>{" "}
          <span className="text-neutral-300">IA integrada</span>,{" "}
          <span className="text-neutral-300">+33 canais</span> e{" "}
          <span className="text-neutral-300">sem limites de planos</span>.
        </p>
      </div>

      {/* Video — full width below, gradient fade at bottom */}
      <div
        ref={videoContainerRef}
        className="hero-entrance hero-entrance-delay-5 relative mt-16 sm:mt-20 will-change-transform"
      >
        {/* Side glows */}
        <div className="pointer-events-none absolute -inset-x-10 top-0 h-[60%] bg-accent/[0.04] blur-[80px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative rounded-t-2xl border border-b-0 border-white/[0.08] bg-surface-raised overflow-hidden shadow-[0_-8px_80px_-10px_rgba(205,40,43,0.2),0_0_0_1px_rgba(255,255,255,0.04)]">
            {/* Browser chrome */}
            <div
              aria-hidden="true"
              className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3 bg-white/[0.02]"
            >
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto rounded-md bg-white/5 px-4 py-1 text-xs text-neutral-600">
                app.multipost.com.br
              </div>
            </div>

            {/* Video */}
            <div className="aspect-video bg-black">
              <video
                ref={videoRef}
                src="/videos/hero.webm"
                muted
                playsInline
                aria-hidden="true"
                preload="auto"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom gradient — fades into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
