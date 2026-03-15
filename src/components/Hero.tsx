"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

const socialIcons = [
  { name: "Instagram", x: "10%", y: "20%", delay: 0, speed: 0.3 },
  { name: "Youtube", x: "85%", y: "15%", delay: 0.5, speed: 0.5 },
  { name: "TikTok", x: "5%", y: "65%", delay: 1, speed: 0.4 },
  { name: "LinkedIn", x: "90%", y: "55%", delay: 1.5, speed: 0.6 },
  { name: "X", x: "15%", y: "85%", delay: 0.8, speed: 0.35 },
  { name: "Facebook", x: "80%", y: "80%", delay: 1.2, speed: 0.45 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Gradient orbs parallax at different speeds
      if (orbsRef.current) {
        const orbs = orbsRef.current.children;
        [20, 35, 15].forEach((yP, i) => {
          if (orbs[i]) {
            gsap.to(orbs[i], {
              yPercent: yP,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });
      }

      // Badge entrance
      gsap.from(badgeRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2,
      });

      // Headline clip-path reveal + letter stagger
      mm.add("(min-width: 768px)", () => {
        if (headlineRef.current) {
          gsap.from(headlineRef.current, {
            clipPath: "inset(0 50% 0 50%)",
            duration: 1,
            ease: "power3.out",
            delay: 0.4,
          });

          const chars = headlineRef.current.querySelectorAll(".split-char");
          if (chars.length > 0) {
            gsap.from(chars, {
              opacity: 0,
              y: 40,
              rotateX: -90,
              stagger: 0.02,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay: 0.5,
            });
          }
        }
      });

      mm.add("(max-width: 767px)", () => {
        if (headlineRef.current) {
          gsap.from(headlineRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.3,
          });
        }
      });

      // Subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.7,
      });

      // CTA
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.9,
      });

      // Scroll indicator
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // Video entrance
      gsap.from(videoRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      // Video scale-down on scroll
      gsap.fromTo(
        videoRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      // Floating social icons with parallax (desktop only)
      mm.add("(min-width: 1024px)", () => {
        const icons = section.querySelectorAll(".hero-social-icon");
        icons.forEach((icon, i) => {
          const s = socialIcons[i];
          if (!s) return;

          gsap.to(icon, {
            y: -15,
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: s.delay,
          });

          gsap.to(icon, {
            yPercent: -100 * s.speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Parallax mesh gradient background */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 mesh-gradient will-change-transform"
      />

      {/* Animated gradient orbs */}
      <div ref={orbsRef} className="pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/8 blur-[150px] animate-glow-pulse will-change-transform" />
        <div
          className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px] animate-glow-pulse will-change-transform"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-violet-800/10 blur-[100px] will-change-transform" />
      </div>

      {/* Floating social icons */}
      {socialIcons.map((icon) => (
        <div
          key={icon.name}
          className="hero-social-icon pointer-events-none absolute hidden opacity-20 lg:block will-change-transform"
          style={{ left: icon.x, top: icon.y }}
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
        </div>
      ))}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Comunidade Automação Sem Limites
          </div>

          {/* Headline with split text */}
          <h1
            ref={headlineRef}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ clipPath: "inset(0 0% 0 0%)" }}
          >
            <SplitText>Publique em</SplitText>{" "}
            <span className="text-gradient">
              <SplitText>todas as redes</SplitText>
            </span>
            <br className="hidden sm:block" />{" "}
            <SplitText>com um único clique</SplitText>
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
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
              className="btn-shimmer group relative rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 px-10 py-4 text-lg font-bold text-white transition-all hover:shadow-2xl hover:shadow-violet-600/30 hover:-translate-y-0.5"
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
              <span className="text-sm text-gray-500">
                Por apenas{" "}
                <span className="font-bold text-violet-400">R$297</span>
              </span>
              <span className="text-xs text-gray-600">
                Pagamento único &bull; Acesso vitalício
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="mt-12 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Video embed */}
        <div ref={videoRef} className="mx-auto mt-12 max-w-4xl will-change-transform">
          <div className="gradient-border glow-violet rounded-2xl bg-[#030014] p-1.5">
            <div className="relative overflow-hidden rounded-xl bg-black/50">
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
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/BdsCVvEYgHU?rel=0&modestbranding=1"
                  title="Robô MultiPost - Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
