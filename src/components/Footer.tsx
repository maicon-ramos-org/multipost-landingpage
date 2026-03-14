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
    <footer className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="m2 14 6-6" />
                <path d="m14 20 8-8" />
              </svg>
            </div>
            <span className="font-bold text-white">
              Multi<span className="text-violet-400">Post</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 transition-colors hover:text-gray-300"
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
            className="rounded-full bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            Garantir Acesso
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-gray-600">
            Comunidade{" "}
            <span className="text-violet-500">Automação Sem Limites</span>
            {" "}&mdash; Todos os direitos reservados &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
