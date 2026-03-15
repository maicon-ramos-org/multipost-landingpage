"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const networks = [
  { name: "Instagram", slug: "Instagram" },
  { name: "YouTube", slug: "Youtube" },
  { name: "Facebook", slug: "Facebook" },
  { name: "LinkedIn", slug: "Linkedin" },
  { name: "X", slug: "X" },
  { name: "TikTok", slug: "TikTok" },
  { name: "Pinterest", slug: "Pinterest" },
  { name: "Threads", slug: "Threads" },
  { name: "Reddit", slug: "Reddit" },
  { name: "Discord", slug: "Discord" },
  { name: "Slack", slug: "Slack" },
  { name: "Mastodon", slug: "Mastodon" },
  { name: "Bluesky", slug: "Bluesky" },
  { name: "Dribbble", slug: "Dribbble" },
];

export default function Networks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading (bidirectional)
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

      // Network icons stagger (bidirectional)
      const items = gridRef.current!.children;
      gsap.fromTo(
        items,
        { scale: 0.5, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        }
      );

      // Footer text (bidirectional)
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "top 75%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="redes" data-section="networks" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-accent-gradient">33+ canais</span> em uma única
            plataforma
          </h2>
          <p className="mt-6 text-lg text-[#999]">
            Conecte todas as suas redes e publique em todos os canais
            simultaneamente.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7 sm:gap-4"
        >
          {networks.map((network) => (
            <div
              key={network.name}
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-surface-raised px-4 py-5 transition-all duration-300 hover:border-accent/20 hover:bg-accent/[0.05] hover:scale-[1.05] hover:-translate-y-1 will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://postiz.com/svgs/socials/${network.slug}.svg`}
                alt={network.name}
                width={28}
                height={28}
                className="opacity-50 transition-all duration-300 group-hover:opacity-100"
                loading="lazy"
              />
              <span className="text-xs font-medium text-[#666] transition-colors group-hover:text-white">
                {network.name}
              </span>
            </div>
          ))}
        </div>

        <p
          ref={footerRef}
          className="mt-8 text-center text-sm text-[#555]"
        >
          + Google Business, Telegram, WhatsApp Status, Tumblr e muitos outros
          via API
        </p>
      </div>
    </section>
  );
}
