/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "postiz.com",
      },
      {
        protocol: "https",
        hostname: "cms.postiz.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  // Long-lived cache for static media in /public (videos, images).
  // IMPORTANT: these filenames are NOT content-hashed, so when you replace a
  // file's *content* you MUST rename it (e.g. hero-agentic-v2.webm) — otherwise
  // Vercel's CDN keeps serving the cached old version even after a redeploy.
  async headers() {
    const cache = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    return [
      { source: "/videos/:path*", headers: cache },
      { source: "/images/:path*", headers: cache },
    ];
  },
};

module.exports = nextConfig;
