"use client";

import { Bot } from "lucide-react";

const CHECKOUT_URL = "https://pay.hotmart.com/P100926086P?checkoutMode=10";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary-500" />
            <span className="font-bold">
              Robô Multi<span className="text-primary-400">Post</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="#funcionalidades"
              className="transition-colors hover:text-gray-300"
            >
              Funcionalidades
            </a>
            <a
              href="#conteudo"
              className="transition-colors hover:text-gray-300"
            >
              Conteúdo
            </a>
            <a
              href="#preco"
              className="transition-colors hover:text-gray-300"
            >
              Preço
            </a>
            <a
              href="#faq"
              className="transition-colors hover:text-gray-300"
            >
              FAQ
            </a>
          </div>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-500"
          >
            Comprar Curso
          </a>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          <p>
            Comunidade{" "}
            <span className="text-primary-500">Automação Sem Limites</span>{" "}
            &mdash; Todos os direitos reservados &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
