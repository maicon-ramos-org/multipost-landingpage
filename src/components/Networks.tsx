"use client";

import { motion } from "framer-motion";

const networks = [
  { name: "Instagram", color: "#E4405F" },
  { name: "Facebook", color: "#1877F2" },
  { name: "X (Twitter)", color: "#ffffff" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "TikTok", color: "#00f2ea" },
  { name: "YouTube", color: "#FF0000" },
  { name: "Pinterest", color: "#BD081C" },
  { name: "Threads", color: "#ffffff" },
  { name: "Reddit", color: "#FF4500" },
  { name: "Discord", color: "#5865F2" },
  { name: "Slack", color: "#4A154B" },
  { name: "Mastodon", color: "#6364FF" },
  { name: "Bluesky", color: "#0085FF" },
  { name: "Dribbble", color: "#EA4C89" },
];

function getInitials(name: string) {
  return name
    .replace(/\(.*\)/, "")
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Networks() {
  return (
    <section id="redes" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">33+ canais</span> suportados
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Conecte todas as suas redes sociais e publique em todos os canais de
            uma vez. E a lista só cresce.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {networks.map((network, i) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3 transition-colors hover:border-white/10 hover:bg-white/[0.06]"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: network.color + "20",
                  color: network.color,
                }}
              >
                {getInitials(network.name)}
              </div>
              <span className="text-sm font-medium text-gray-300">
                {network.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          + Google Business, Telegram, WhatsApp Status, Tumblr e muitos outros
          via API e webhooks
        </motion.p>
      </div>
    </section>
  );
}
