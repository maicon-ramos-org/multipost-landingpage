"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import type { Variants } from "framer-motion";

const networks = [
  { name: "Instagram", slug: "Instagram" },
  { name: "YouTube", slug: "Youtube" },
  { name: "Facebook", slug: "Facebook" },
  { name: "LinkedIn", slug: "Linkedin" },
  { name: "X", slug: "X" },
  { name: "TikTok", slug: "TikTok" },
  { name: "Pinterest", slug: "Pinterest" },
  { name: "Threads", slug: "Threads" },
  { name: "Reddit", slug: "Reddit" },
  { name: "Discord", slug: "Discord" },
  { name: "Slack", slug: "Slack" },
  { name: "Mastodon", slug: "Mastodon" },
  { name: "Bluesky", slug: "Bluesky" },
  { name: "Dribbble", slug: "Dribbble" },
];

const gridStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const networkItem: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function Networks() {
  return (
    <section id="redes" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-gradient">33+ canais</span> em uma única
            plataforma
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Conecte todas as suas redes e publique em todos os canais
            simultaneamente.
          </p>
        </motion.div>

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7"
        >
          {networks.map((network) => (
            <motion.div
              key={network.name}
              variants={networkItem}
              whileHover={{
                scale: 1.08,
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="glass gradient-border group flex flex-col items-center gap-3 rounded-xl px-4 py-5 transition-shadow duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-violet-600/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://postiz.com/svgs/socials/${network.slug}.svg`}
                alt={network.name}
                width={28}
                height={28}
                className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                loading="lazy"
              />
              <span className="text-xs font-medium text-gray-400 transition-colors group-hover:text-white">
                {network.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 text-center text-sm text-gray-600"
        >
          + Google Business, Telegram, WhatsApp Status, Tumblr e muitos outros
          via API
        </motion.p>
      </div>
    </section>
  );
}
