"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

const included = [
  "Curso completo com 8 módulos",
  "Acesso vitalício ao conteúdo",
  "Código-fonte do Robô MultiPost",
  "Setup Docker pronto para produção",
  "Integração com IA configurada",
  "Templates de automação n8n",
  "Comunidade Automação Sem Limites",
  "Atualizações futuras inclusas",
  "Suporte na comunidade",
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

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

      // Card entrance with spring bounce
      gsap.from(cardRef.current!, {
        opacity: 0,
        scale: 0.85,
        y: 60,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Checkmarks cascade
      if (listRef.current) {
        const items = listRef.current.children;
        gsap.from(items, {
          opacity: 0,
          x: -20,
          stagger: 0.06,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
        });

        // Checkmark icons pop
        const checks = listRef.current.querySelectorAll(".check-icon");
        gsap.from(checks, {
          scale: 0,
          opacity: 0,
          stagger: 0.06,
          duration: 0.3,
          ease: "back.out(3)",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
          delay: 0.15,
        });
      }

      // 3D tilt on mouse (desktop)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const card = cardRef.current;
        if (!card) return;

        card.style.perspective = "1000px";
        card.style.transformStyle = "preserve-3d";

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }, section);

    return () => ctx.revert();
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section ref={sectionRef} id="preco" className="relative py-20 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Invista uma vez,{" "}
            <span className="text-gradient">economize para sempre</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Enquanto outros pagam R$200+/mês em ferramentas limitadas, você
            investe uma única vez e tem controle total.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg" style={{ perspective: "1000px" }}>
          <div
            ref={cardRef}
            className="gradient-border glow-violet-strong rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-10 will-change-transform"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Acesso Completo
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-lg text-gray-600 line-through">R$597</span>
              <span className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                R$297
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Pagamento único &bull; Sem mensalidade &bull; Para sempre
            </p>

            {/* Divider */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Benefits */}
            <ul ref={listRef} className="space-y-3.5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="check-icon mt-0.5 shrink-0 text-violet-400"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 py-4 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Garantir Minha Vaga
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

            {/* Trust */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                7 dias de garantia
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                </svg>
                Acesso vitalício
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                Suporte incluso
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
