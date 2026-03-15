"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

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
      // Badge entrance
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });

      // Headline entrance
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      // Subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.5,
      });

      // CTA
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.7,
      });

      // Video container entrance
      gsap.from(videoContainerRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      // Video scroll-scrub: as user scrolls, video plays forward/backward
      if (video) {
        const setupVideoScrub = () => {
          if (!video.duration) return;

          ScrollTrigger.create({
            trigger: videoContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
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

      // Parallax: text fades out as you scroll (bidirectional)
      gsap.to([headlineRef.current, subtitleRef.current, ctaRef.current], {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // Video scale-up as it enters view (bidirectional)
      gsap.fromTo(
        videoContainerRef.current,
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top 90%",
            end: "top 30%",
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
      className="relative min-h-screen overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32"
    >
      {/* Subtle gradient accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-accent/[0.04] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.08] px-5 py-2 text-sm text-accent"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Comunidade Automação Sem Limites
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Publique em{" "}
            <span className="text-accent-gradient">todas as redes</span>
            <br className="hidden sm:block" />{" "}
            com um único clique
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#999] sm:text-xl"
          >
            Agendador de redes sociais self-hosted com{" "}
            <span className="font-medium text-white">IA integrada</span>,{" "}
            <span className="font-medium text-white">33+ canais</span> e{" "}
            <span className="font-medium text-white">zero mensalidade</span>.
            Rode no seu servidor, automatize com n8n, escale sem limites.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
          >
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer group rounded-full bg-accent px-10 py-4 text-lg font-bold text-white transition-all hover:bg-accent-hover hover:shadow-2xl hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Quero o Robô MultiPost
                <svg
                  width="20"
                  height="20"
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
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-sm text-[#666]">
                Por apenas{" "}
                <span className="font-bold text-accent">R$297</span>
              </span>
              <span className="text-xs text-[#555]">
                Pagamento único &bull; Acesso vitalício
              </span>
            </div>
          </div>
        </div>

        {/* Video with scroll-scrub */}
        <div ref={videoContainerRef} className="mx-auto mt-20 max-w-5xl will-change-transform">
          <div className="rounded-2xl border border-white/[0.08] bg-surface-raised overflow-hidden shadow-2xl shadow-black/50">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto rounded-md bg-white/5 px-4 py-1 text-xs text-[#555]">
                app.multipost.com.br
              </div>
            </div>
            <div className="aspect-video bg-black">
              <video
                ref={videoRef}
                src="https://postiz.com/videos/hero.webm"
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
