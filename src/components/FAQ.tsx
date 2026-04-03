"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Preciso saber programar para fazer o treinamento?",
    answer:
      "O curso foi pensado para pessoas com disposição para aprender o básico de servidores. Você vai seguir um passo a passo completo com Docker — não precisa ser programador, mas ter familiaridade com terminal e não ter medo de configurar coisas ajuda muito. Se nunca usou um terminal, pode ser desafiador. Se já mexeu com WordPress em VPS, n8n, ou qualquer ferramenta self-hosted, vai se sentir em casa.",
  },
  {
    question: "O que preciso além do curso para começar?",
    answer:
      "Você vai precisar alugar um VPS (servidor virtual) — recomendamos no mínimo 2GB RAM e 2 vCPU, que custa entre R$30-50/mês. Também precisará criar contas de desenvolvedor nas redes sociais que quiser conectar e seguir o processo de aprovação de cada uma. É importante saber que existe esse investimento de tempo e infraestrutura além do valor do treinamento.",
  },
  {
    question: "Isso é um SaaS ou preciso instalar em um servidor?",
    answer:
      "O MultiPost não é um SaaS onde você cria uma conta e sai usando. É um software self-hosted — você instala no seu próprio servidor e tem controle total. O curso ensina o processo de instalação e configuração do MultiPost, além de orientações gerais sobre como conectar as redes sociais. Vale lembrar que cada plataforma tem seu próprio processo de aprovação de desenvolvedor, que está fora do nosso controle.",
  },
  {
    question: "Quanto custa manter o servidor rodando?",
    answer:
      "Um VPS básico (2GB RAM, 2 vCPU) custa entre R$30-50/mês e é suficiente para rodar o MultiPost com centenas de perfis. Para a IA, o custo é diretamente com o provedor — por exemplo, o GPT cobra cerca de US$0,01 por 1000 palavras geradas. Muito menos do que qualquer ferramenta SaaS equivalente.",
  },
  {
    question: "Posso usar em mais de uma conta ou rede social?",
    answer:
      "Sim, pode utilizar em quantas contas e redes sociais desejar, sem limites. O sistema suporta 25+ canais nativamente — Instagram, Facebook, X, LinkedIn, TikTok, YouTube, Pinterest, e muito mais.",
  },
  {
    question: "Vou ter algum suporte?",
    answer:
      "SIM! Nos primeiros 30 dias após a compra, você pode agendar uma sessão de suporte remoto 1 a 1 com nossa equipe via compartilhamento de tela para solucionar erros que possam surgir durante o processo das aulas.",
  },
  {
    question: "Vocês instalam e configuram tudo para mim?",
    answer:
      "Este treinamento não inclui serviço de instalação ou implementação. As aulas ensinam você a fazer tudo passo a passo, e o suporte remoto existe para corrigir erros pontuais que surjam durante esse processo de aprendizado. Caso prefira que alguém implemente o MultiPost para você, isso é possível como um serviço à parte — entre em contato conosco para saber mais.",
  },
  {
    question: "O que acontece se eu não gostar do curso?",
    answer:
      "Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeito, é só solicitar o cancelamento direto na Hotmart e devolvemos 100% do seu investimento.",
  },
  {
    question: "Funciona com n8n, Claude Code e OpenClaw?",
    answer:
      "Sim! O MultiPost conta com API pública, MCP (Model Context Protocol) e CLI Agent nativos, o que permite integração direta com n8n, Claude Code, OpenClaw e qualquer outra ferramenta compatível com esse padrão.",
  },
  {
    question: "O conteúdo publicado é seguro para as redes sociais?",
    answer:
      "O conteúdo é você quem define. Independente de ser automático ou manual, é importante seguir as regras e diretrizes de cada plataforma. O MultiPost usa as APIs oficiais das redes sociais, o que garante compatibilidade e segurança.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos cartão de crédito, PIX, boleto bancário e outras formas disponíveis na Hotmart. Você escolhe a que for mais conveniente.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="faq-item border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-6 font-medium text-white transition-colors group-hover:text-accent">
          {question}
        </span>
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            borderColor: open ? "rgba(205, 40, 43, 0.3)" : "rgba(255, 255, 255, 0.1)",
            backgroundColor: open ? "rgba(205, 40, 43, 0.1)" : "transparent",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-neutral-400"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight ?? 200}px` : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="pb-6 leading-relaxed text-neutral-400">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current!,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 0.3,
          },
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              end: "top 65%",
              scrub: 0.3,
            },
          }
        );
      }

      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".faq-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.3,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" data-section="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr] lg:items-start">

          <div ref={headerRef} className="lg:sticky lg:top-32 text-center lg:text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Perguntas{" "}
              <span className="text-accent-gradient">frequentes</span>
            </h2>
            <p className="mt-5 text-lg text-neutral-400">
              Tudo que você precisa saber antes de começar.
            </p>

            <div ref={statsRef} className="mt-8 flex items-center justify-center lg:justify-start gap-6">
              {[
                { val: `${faqs.length}`, label: "Perguntas" },
                { val: "7d", label: "Garantia" },
                { val: "1:1", label: "Suporte" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    {item.val}
                  </div>
                  <div className="text-xs text-neutral-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={containerRef}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 sm:px-8"
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
