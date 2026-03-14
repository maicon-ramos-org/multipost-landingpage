"use client";

import { useState } from "react";
import { Bot, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Redes", href: "#redes" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Preço", href: "#preco" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary-500" />
          <span className="text-lg font-bold">
            Multi<span className="text-primary-400">Post</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/25"
          >
            Comprar Curso
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-400 md:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg bg-primary-600 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Comprar Curso
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
