"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHECKOUT_URL = "https://pay.hotmart.com/M105160596J?checkoutMode=10";

const included = [
  "Aulas direto ao ponto",
  "Acesso vitalício ao conteúdo",
  "Código-fonte para download",
  "Setup Docker pronto para produção",
  "Integração com IA configurada",
  "Suporte remoto 1-a-1 nos primeiros 30 dias",
  "Acesso à Comunidade no Discord",
  "Sem limite de Redes Sociais",
  "Sem Limites de Perfis",
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

      gsap.fromTo(
        cardRef.current!,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.3,
          },
        }
      );

      if (listRef.current) {
        const items = listRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.3,
            },
          }
        );
      }

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
    <section ref={sectionRef} id="preco" data-section="pricing" className="relative py-24 sm:py-32">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-16 text-center">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Invista uma vez,{" "}
              <span className="text-accent-gradient">economize todo mês</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-400">
              Enquanto outros pagam R$200+/mês em ferramentas limitadas, você
              investe R$297 no treinamento e tem controle total.
            </p>
          </div>
        </div>

        <div
          className="mx-auto max-w-lg"
          style={{ perspective: "1000px" }}
        >
          {/* Electric Card */}
          <div className="relative bg-neutral-900 rounded-[32px] p-[2px] electric-card overflow-hidden">
            {/* Glowing Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-300 via-red-500 to-transparent opacity-80 z-0" />

            {/* Inner Card */}
            <div
              ref={cardRef}
              className="relative z-10 bg-[#0A0A0A] rounded-[30px] h-full p-8 sm:p-10 will-change-transform flex flex-col overflow-hidden"
            >
              {/* Background glow inside card */}
              <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-text self-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Acesso Completo
              </div>

              {/* Price */}
              <div className="relative z-10 flex items-baseline gap-3">
                <span className="text-lg text-neutral-500 line-through">R$597</span>
                <span className="font-display text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-accent sm:text-6xl">
                  R$297
                </span>
              </div>
              <p className="relative z-10 mt-2 text-sm text-neutral-400">
                Pagamento único do curso
              </p>

              {/* Divider */}
              <div className="relative z-10 my-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              {/* Benefits */}
              <ul ref={listRef} className="relative z-10 space-y-4 mb-10 flex-grow">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-4 group/item">
                    <div className="flex-none transition-transform group-hover/item:translate-x-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#cd282b" className="text-accent">
                        <path d="M22 12 6 22V2z" stroke="none" />
                      </svg>
                    </div>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 btn-shimmer group w-full py-4 rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400 hover:brightness-110 text-white transition-all shadow-[0_8px_30px_-5px_rgba(205,40,43,0.4)] flex items-center justify-center gap-2 border-t border-white/20 hover:shadow-[0_8px_40px_-5px_rgba(205,40,43,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg font-bold">
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
              <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  7 dias de garantia
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                  </svg>
                  Acesso vitalício
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                  Suporte agendado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
