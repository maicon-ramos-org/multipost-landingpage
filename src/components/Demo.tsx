"use client";

import { motion } from "framer-motion";

export default function Demo() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Uma interface que você{" "}
            <span className="text-gradient">realmente quer usar</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Design moderno, experiência fluida. Cada detalhe pensado para produtividade máxima.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="gradient-border glow-violet-strong rounded-2xl bg-[#030014] p-1.5">
            <div className="overflow-hidden rounded-xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/40" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
                  <div className="h-3 w-3 rounded-full bg-green-500/40" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-lg bg-white/5 px-4 py-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-xs text-gray-500">app.multipost.com.br</span>
                </div>
              </div>

              {/* App mockup */}
              <div className="bg-[#0d0d1a] p-6">
                <div className="flex gap-4">
                  {/* Sidebar */}
                  <div className="hidden w-48 shrink-0 space-y-2 sm:block">
                    {["Dashboard", "Calendário", "Posts", "Analytics", "Equipe", "Configurações"].map((item, i) => (
                      <div
                        key={item}
                        className={`rounded-lg px-3 py-2 text-xs ${
                          i === 0
                            ? "bg-violet-500/10 text-violet-400 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">Dashboard</div>
                        <div className="text-[10px] text-gray-600">Visão geral das suas redes</div>
                      </div>
                      <div className="rounded-lg bg-violet-500/20 px-3 py-1.5 text-[10px] font-medium text-violet-400">
                        + Novo Post
                      </div>
                    </div>

                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Posts Agendados", value: "24" },
                        { label: "Engajamento", value: "12.4K" },
                        { label: "Canais Ativos", value: "8" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg bg-white/[0.02] border border-white/5 p-3">
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <div className="text-[10px] text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4">
                      <div className="text-xs font-medium text-gray-400 mb-3">Engajamento — 7 dias</div>
                      <div className="flex items-end gap-2 h-20">
                        {[30, 50, 40, 70, 55, 85, 65].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-600/30 to-violet-400/10" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
