"use client";

import React from "react";
import Image from "next/image";

const socialLogos = [
  { name: "Instagram", src: "/images/social/instagram.png" },
  { name: "Youtube", src: "/images/social/youtube.svg" },
  { name: "Facebook", src: "/images/social/facebook.png" },
  { name: "LinkedIn", src: "/images/social/linkedin.png" },
  { name: "X", src: "/images/social/x.png" },
  { name: "TikTok", src: "/images/social/tiktok.png" },
  { name: "Threads", src: "/images/social/threads.png" },
  { name: "Reddit", src: "/images/social/reddit.png" },
  { name: "Discord", src: "/images/social/discord.png" },
  { name: "Slack", src: "/images/social/slack.png" },
  { name: "Pinterest", src: "/images/social/pinterest.png" },
  { name: "Telegram", src: "/images/social/telegram.png" },
  { name: "Twitch", src: "/images/social/twitch.png" },
  { name: "BlueSky", src: "/images/social/bluesky.png" },
  { name: "Dribbble", src: "/images/social/dribbble.png" },
  { name: "Mastodon", src: "/images/social/mastodon.png" },
  { name: "WordPress", src: "/images/social/wordpress.png" },
  { name: "Google Business", src: "/images/social/gmb.png" },
  { name: "Medium", src: "/images/social/medium.png" },
  { name: "VK", src: "/images/social/vk.png" },
  { name: "Skool", src: "/images/social/skool.png" },
  { name: "Kick", src: "/images/social/kick.png" },
  { name: "Whop", src: "/images/social/whop.png" },
  { name: "Lemmy", src: "/images/social/lemmy.png" },
  { name: "Hashnode", src: "/images/social/hashnode.png" },
  { name: "Dev.to", src: "/images/social/devto.png" },
  { name: "ListMonk", src: "/images/social/listmonk.png" },
  { name: "Openclaw", src: "/images/social/moltbook.png" },
  { name: "Nostr", src: "/images/social/nostr.png" },
  { name: "Late", src: "/images/social/late.png" },
  { name: "Wrapcast", src: "/images/social/wrapcast.png" },
  { name: "Facebook Page", src: "/images/social/facebook-page.png" },
  { name: "Instagram Page", src: "/images/social/instagram-page.png" },
  { name: "LinkedIn Page", src: "/images/social/linkedin-page.png" },
  { name: "Threads Alt", src: "/images/social/threads-alt.png" },
  { name: "Instagram Pro", src: "/images/social/instagram-standalone.png" },
];

export default function SocialCarousel() {
  return (
    <section id="redes" data-section="networks" aria-label="Redes sociais suportadas" className="relative w-full overflow-hidden bg-transparent py-16">
      <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          <span className="text-accent-text underline decoration-red-500/30 underline-offset-8">33+ CANAIS</span> EM UMA ÚNICA PLATAFORMA
        </h2>
      </div>

      <div 
        className="relative flex items-center"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Marquee Container */}
        <div className="flex w-fit animate-marquee items-center gap-6 px-12">
          {[...socialLogos, ...socialLogos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group flex flex-none items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-2.5 pr-5 py-2 transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(205,40,43,0.3)] backdrop-blur-md"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 border border-white/10 group-hover:border-accent/30 shadow-lg"
              />
              <span className="text-sm font-medium text-neutral-400 transition-colors duration-500 group-hover:text-white">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
