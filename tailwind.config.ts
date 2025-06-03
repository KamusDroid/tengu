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
        tomoeRed: "#dc2626", // rojo intenso personalizado
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "spin-slower": "spin 12s linear infinite",
      },
      boxShadow: {
        tomoe: "0 0 70px rgba(220, 38, 38, 0.6)", // sombra roja para los círculos
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

export default config
