"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/animations";

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28">
      {/* Background glow orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Uma interface que você{" "}
            <span className="text-gradient">realmente quer usar</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Design moderno, experiência fluida. Cada detalhe pensado para
            produtividade máxima.
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
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
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-600"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-xs text-gray-500">
                    app.multipost.com.br
                  </span>
                </div>
              </div>

              {/* Real screenshot with parallax */}
              <motion.div style={{ y: imgY }} className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://postiz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTool-Planning.3f9ff858.png&w=1920&q=75"
                  alt="Postiz - Calendário de agendamento"
                  className="w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
