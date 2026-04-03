"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading (bidirectional)
      gsap.fromTo(
        headingRef.current!,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 0.3,
          },
        }
      );

      // Image parallax inside browser frame
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: browserRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Browser frame scale grows with scroll (bidirectional)
      gsap.fromTo(
        browserRef.current!,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: browserRef.current,
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
    <section ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Uma interface que você{" "}
            <span className="text-accent-gradient">realmente quer usar</span>
          </h2>
          <p className="mt-5 text-lg text-[#999]">
            Design moderno, experiência fluida. Cada detalhe pensado para
            produtividade máxima.
          </p>
        </div>

        <div ref={browserRef} className="mx-auto mt-16 max-w-5xl will-change-transform">
          <div className="rounded-2xl border border-white/[0.08] bg-surface-raised p-1.5 shadow-2xl shadow-black/30">
            <div className="overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-lg bg-white/5 px-4 py-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#555]"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-xs text-[#555]">
                    app.multipost.com.br
                  </span>
                </div>
              </div>

              <div className="overflow-hidden">
                <div ref={imgRef} className="will-change-transform">
                  <Image
                    src="https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Planning.3f9ff858.png&w=1920&q=75"
                    alt="Postiz - Calendário de agendamento"
                    width={1920}
                    height={1080}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
