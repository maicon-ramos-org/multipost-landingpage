import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#0A0A0A",
          raised: "#141414",
          overlay: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#FF6B2C",
          hover: "#FF8F5E",
          subtle: "rgba(255, 107, 44, 0.1)",
        },
        muted: "#737373",
        border: "#262626",
      },
      animation: {
        "shimmer-sweep": "shimmer-sweep 3s ease-in-out infinite",
      },
      keyframes: {
        "shimmer-sweep": {
          "0%": { transform: "translateX(-100%) rotate(15deg)" },
          "100%": { transform: "translateX(100%) rotate(15deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
