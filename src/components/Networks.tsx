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

      // Network icons - wave stagger from left to right
      const items = gridRef.current!.children;
      gsap.from(items, {
        scale: 0,
        opacity: 0,
        rotateY: 90,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Footer text
      gsap.from(footerRef.current!, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="redes" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-gradient">33+ canais</span> em uma única
            plataforma
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Conecte todas as suas redes e publique em todos os canais
            simultaneamente.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7"
        >
          {networks.map((network) => (
            <div
              key={network.name}
              className="network-item glass gradient-border group flex flex-col items-center gap-3 rounded-xl px-4 py-5 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-violet-600/10 hover:scale-[1.08] hover:-translate-y-1 will-change-transform"
              style={{ perspective: "600px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://postiz.com/svgs/socials/${network.slug}.svg`}
                alt={network.name}
                width={28}
                height={28}
                className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                loading="lazy"
              />
              <span className="text-xs font-medium text-gray-400 transition-colors group-hover:text-white">
                {network.name}
              </span>
            </div>
          ))}
        </div>

        <p
          ref={footerRef}
          className="mt-8 text-center text-sm text-gray-600"
        >
          + Google Business, Telegram, WhatsApp Status, Tumblr e muitos outros
          via API
        </p>
      </div>
    </section>
  );
}
