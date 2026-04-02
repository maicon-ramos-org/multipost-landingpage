"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "+33", label: "Canais Suportados" },
  { value: "MCP", label: "API e Agents CLI" },
  { value: "IA", label: "integrada" },
  { value: "100%", label: "Self-Hosted" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !itemsRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current!.children;
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" data-section="stats" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={sectionRef}>
          <div
            ref={itemsRef}
            className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center lg:px-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] py-8 lg:border-0 lg:bg-transparent lg:rounded-none lg:border-r lg:border-white/[0.06] last:border-r-0"
              >
                <div className="font-display text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-accent sm:text-5xl md:text-6xl">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
