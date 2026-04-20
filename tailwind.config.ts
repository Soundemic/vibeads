import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#FDF8EC",
          100: "#F8EEC9",
          200: "#F0D080",
          300: "#E8B84C",
          400: "#C9A84C",
          500: "#A8872E",
          600: "#8B6420",
          700: "#6B4A14",
          800: "#4A320C",
          900: "#2A1C06",
        },
        surface: {
          0: "#06060A",
          1: "#0D0D14",
          2: "#13131C",
          3: "#1A1A26",
          4: "#222230",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          default: "rgba(255,255,255,0.09)",
          gold: "rgba(201,168,76,0.25)",
          "gold-strong": "rgba(201,168,76,0.45)",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)",
        "gold-radial": "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
        "surface-gradient": "linear-gradient(180deg, rgba(13,13,20,0) 0%, rgba(13,13,20,0.9) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(201,168,76,0.25)",
        "gold-glow-lg": "0 0 48px rgba(201,168,76,0.35)",
        "card": "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "drift": "drift 20s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 25px) scale(0.95)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
