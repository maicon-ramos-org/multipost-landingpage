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
  // These are stable assets — when you replace a file's *content*, rename it
  // (or append ?v=2) so returning visitors don't keep the cached version.
  async headers() {
    return [
      {
        source: "/:path*.(webm|mp4|webp|svg|png|jpg|jpeg|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
