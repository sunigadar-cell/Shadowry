import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      colors: {
        background: "#09090b", // Deep Black/Grey
        surface: "#18181b",    // Lighter Card Background
        border: "#27272a",     // Subtle Border
        gold: {
          400: "#FACC15",
          500: "#EAB308",      // The "Luxury" Gold
          600: "#CA8A04",
        },
        secondary: "#A1A1AA",  // Muted Text
      }
    },
  },
  plugins: [],
};
export default config;
