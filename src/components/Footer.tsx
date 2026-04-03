const CHECKOUT_URL = "https://pay.hotmart.com/M105160596J?checkoutMode=10";

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
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/postiz-icon.svg"
              alt="MultiPost"
              width={28}
              height={28}
            />
            <span className="font-display text-lg font-bold text-white">
              Multi<span className="text-accent-text">Post</span>
            </span>
          </div>

          {/* Nav links */}
          <nav aria-label="Links do rodapé" className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
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
            className="rounded-full border border-accent/20 bg-accent/[0.08] px-6 py-2.5 text-sm font-medium text-accent-text transition-all hover:bg-accent/15 hover:border-accent/30"
          >
            Começar o Treinamento
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center">
          <p className="text-sm text-neutral-400">
            Comunidade{" "}
            <span className="text-accent-text">Automação Sem Limites</span>
            {" "}&mdash; Todos os direitos reservados &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
