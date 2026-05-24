import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tomoeRed: "#dc2626",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.7", transform: "translateY(-50%) scale(1)" },
          "50%": { opacity: "1", transform: "translateY(-50%) scale(1.08)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-tomoe": "spin 18s linear infinite",
        "spin-nav": "spin 8s linear infinite",
        "spin-footer": "spin 12s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
      },
      boxShadow: {
        tomoe: "0 0 70px rgba(220, 38, 38, 0.6)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

export default config
