"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ChromeKind = "chat" | "telegram" | "terminal";

interface Channel {
  id: string;
  label: string;
  description: string;
  video: string;
  brand: string;
  chrome: ChromeKind;
}

const channels: Channel[] = [
  {
    id: "chatgpt",
    label: "Via ChatGPT",
    description:
      "Gere e refine publicações para suas redes sociais conversando com o ChatGPT — apenas com prompts simples.",
    video: "/videos/chatgpt.webm",
    brand: "#10a37f",
    chrome: "chat",
  },
  {
    id: "telegram",
    label: "Via Telegram",
    description:
      "Automatize a criação e o agendamento do seu conteúdo direto pelo Telegram, com fluxos simples e instantâneos.",
    video: "/videos/openclaw.webm",
    brand: "#229ED9",
    chrome: "telegram",
  },
  {
    id: "claude-code",
    label: "Via Claude Code",
    description:
      "Crie e agende publicações sem sair do seu terminal, usando o Claude Code para orquestrar tudo por comandos.",
    video: "/videos/claude.webm",
    brand: "#cd282b",
    chrome: "terminal",
  },
];

/* ─── Themed window chrome (top bar of each card) ───────────── */
function ChromeBar({ kind, brand }: { kind: ChromeKind; brand: string }) {
  if (kind === "terminal") {
    return (
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-black/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[11px] tracking-tight text-neutral-500">
          multipost — claude code
        </span>
        <span className="ml-auto font-mono text-[11px] text-neutral-600">
          ⌘
        </span>
      </div>
    );
  }

  if (kind === "telegram") {
    return (
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: brand }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff" aria-hidden="true">
            <path d="M21.94 4.3 18.7 19.6c-.24 1.08-.88 1.35-1.78.84l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.99.48l.35-5.02 9.13-8.25c.4-.35-.09-.55-.61-.2L6.21 13.04l-4.86-1.52c-1.06-.33-1.08-1.06.22-1.57L20.57 2.8c.88-.33 1.65.2 1.37 1.5Z" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-white">Jarvis BOT</p>
          <p className="flex items-center gap-1 text-[10px] text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            online
          </p>
        </div>
      </div>
    );
  }

  // chat (ChatGPT)
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: brand }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" />
        </svg>
      </span>
      <div className="flex-1 rounded-full bg-white/[0.04] px-3.5 py-1.5">
        <span className="text-[11px] text-neutral-500">
          Crie 3 posts sobre…
        </span>
      </div>
    </div>
  );
}

/* ─── Single channel card ───────────────────────────────────── */
function ChannelCard({ channel }: { channel: Channel }) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      { threshold: 0.3 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      data-aia-card
      className="group flex flex-col"
    >
      {/* Themed window */}
      <div
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-raised shadow-xl shadow-black/30 transition-colors duration-500"
        style={{ ["--brand" as string]: channel.brand }}
      >
        <ChromeBar kind={channel.chrome} brand={channel.brand} />
        <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
          <video
            ref={videoRef}
            src={channel.video}
            muted
            playsInline
            loop
            aria-hidden="true"
            preload="none"
            className="h-full w-full object-cover"
          />
          {/* Brand wash on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(120% 120% at 50% 100%, ${channel.brand}22 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>

      {/* Copy */}
      <div className="mt-6 px-1">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: channel.brand,
              boxShadow: `0 0 12px ${channel.brand}`,
            }}
          />
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {channel.label}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          {channel.description}
        </p>
      </div>
    </article>
  );
}

/* ─── Section ───────────────────────────────────────────────── */
export default function AIAutomation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>("[data-aia-card]");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ia-automacao"
      data-section="ia-automacao"
      className="relative bg-transparent py-20 sm:py-28"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[140px]" />

      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            IA &amp; Automação
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Potencialize seu conteúdo com{" "}
            <span className="text-accent-gradient">IA e Automação</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-neutral-400">
            Crie, refine e publique de onde você já trabalha. Conecte o Multipost
            ao ChatGPT, ao Telegram ou ao seu terminal e deixe a automação fazer o
            trabalho pesado.
          </p>
        </div>
      </div>

      {/* Cards — full width */}
      <div
        ref={gridRef}
        className="mt-16 grid grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 md:gap-6 lg:gap-8 lg:px-10"
      >
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}
