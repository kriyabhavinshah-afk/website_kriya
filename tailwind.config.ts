import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#fefdfb",
        foreground: "#2d2a26",
        muted: "#8a7f7a",
        accent: "#e8b4bc",
        "accent-glow": "#f5d5da",
        border: "#ede5e8",
        card: "#fff9f6",
        // Pastels
        "pastel-pink": "#f4c2c9",
        "pastel-lavender": "#d4c4e8",
        "pastel-mint": "#c4e8d4",
        "pastel-peach": "#f4d4c2",
        "pastel-sky": "#c2d4f4",
        "gallery-bg": "#f5f3ef",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #fefdfb 0%, #fff5f7 50%, #fef9fb 100%)",
        "card-shine": "linear-gradient(135deg, transparent 0%, rgba(244,194,201,0.15) 50%, transparent 100%)",
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        trajan: ['"Trajan Pro"', "Trajan", "Georgia", "serif"],
        "open-sans": ["var(--font-open-sans)", "system-ui", "sans-serif"],
        canela: ["var(--font-canela)", "Georgia", "serif"],
        optima: ['Optima', '"Segoe UI"', "Nimbus Sans L", "Liberation Sans", "sans-serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1100px",
        wide: "1200px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
