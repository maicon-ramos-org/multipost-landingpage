"use client";

import { motion } from "framer-motion";

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

export default function Networks() {
  return (
    <section id="redes" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-gradient">33+ canais</span> em uma única plataforma
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Conecte todas as suas redes e publique em todos os canais simultaneamente.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
          {networks.map((network, i) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="glass gradient-border group flex flex-col items-center gap-3 rounded-xl px-4 py-5 transition-all hover:bg-white/[0.06]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://postiz.com/svgs/socials/${network.slug}.svg`}
                alt={network.name}
                width={28}
                height={28}
                className="opacity-60 transition-opacity group-hover:opacity-100"
                loading="lazy"
              />
              <span className="text-xs font-medium text-gray-400 transition-colors group-hover:text-white">
                {network.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          + Google Business, Telegram, WhatsApp Status, Tumblr e muitos outros via API
        </motion.p>
      </div>
    </section>
  );
}
