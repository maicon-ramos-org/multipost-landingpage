"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

      // Browser frame entrance with scale
      gsap.from(browserRef.current!, {
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: browserRef.current,
          start: "top 85%",
          once: true,
        },
      });

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

      // Browser frame scale grows with scroll
      gsap.fromTo(
        browserRef.current!,
        { scale: 0.92 },
        {
          scale: 1,
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
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Uma interface que você{" "}
            <span className="text-gradient">realmente quer usar</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Design moderno, experiência fluida. Cada detalhe pensado para
            produtividade máxima.
          </p>
        </div>

        <div ref={browserRef} className="mx-auto mt-16 max-w-5xl will-change-transform">
          <div className="gradient-border glow-violet-strong rounded-2xl bg-[#030014] p-1.5">
            <div className="overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/40" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
                  <div className="h-3 w-3 rounded-full bg-green-500/40" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-lg bg-white/5 px-4 py-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-600"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-xs text-gray-500">
                    app.multipost.com.br
                  </span>
                </div>
              </div>

              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src="https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Planning.3f9ff858.png&w=1920&q=75"
                  alt="Postiz - Calendário de agendamento"
                  className="w-full will-change-transform"
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
