"use client";

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

const links = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Redes", href: "#redes" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Preço", href: "#preco" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer id="footer" data-section="footer" className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://raw.githubusercontent.com/maiconramos/robo-multipost/refs/heads/main/apps/frontend/public/postiz.svg"
              alt="MultiPost"
              width={28}
              height={28}
            />
            <span className="font-display text-lg font-bold text-white">
              Multi<span className="text-accent">Post</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#666] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/20 bg-accent/[0.08] px-6 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/15 hover:border-accent/30"
          >
            Garantir Acesso
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center">
          <p className="text-sm text-[#555]">
            Comunidade{" "}
            <span className="text-accent">Automação Sem Limites</span>
            {" "}&mdash; Todos os direitos reservados &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
