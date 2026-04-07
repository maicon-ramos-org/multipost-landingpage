"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Como funciona", href: "#treinamento" },
  { label: "Preço", href: "#preco" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top -40",
      onUpdate: (self) => {
        setScrolled(self.scroll() > 40);
      },
    });

    const navIds = navLinks.map((l) => l.href.replace("#", ""));

    const updateActive = () => {
      const mid = window.scrollY + window.innerHeight * 0.35;
      let current = navIds[0];
      for (const id of navIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= mid) {
          current = id;
        }
      }
      setActiveSection(`#${current}`);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    return () => {
      trigger.kill();
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      data-section="header"
      className={`relative md:fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 relative">
        <a href="#" className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/multipost-logo-dark.svg"
            alt="MultiPost"
            fetchPriority="high"
            className="h-7"
          />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center md:flex">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-1 py-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href); }}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white border border-white/5 shadow-inner"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          <a
            href="#preco"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("#preco"); }}
            className="ml-4 rounded-full bg-gradient-to-b from-red-500 to-red-700 border-t border-white/20 px-6 py-2 text-sm font-semibold text-white transition-all shadow-[0_0_15px_-3px_rgba(205,40,43,0.4)] hover:brightness-110 hover:shadow-[0_0_25px_-3px_rgba(205,40,43,0.6)]"
          >
            Garantir Acesso
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hidden"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className="overflow-hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl md:hidden transition-all duration-200"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <nav aria-label="Navegação principal" className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothScrollTo(link.href); }}
              className="rounded-lg px-4 py-3 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#preco"
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothScrollTo("#preco"); }}
            className="mt-2 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Garantir Acesso
          </a>
        </nav>
      </div>
    </header>
  );
}
