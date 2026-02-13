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
        // The "Sovereign" Dark Palette
        background: "#09090b", // Rich Obsidian
        surface: "#18181b",    // Lighter dark for cards
        border: "#27272a",     // Subtle borders
        
        // Luxury Gold Accents
        gold: {
          400: "#FACC15",
          500: "#EAB308", // Primary Gold
          600: "#CA8A04", // Hover Gold
        },
        
        // Text Colors
        primary: "#FAFAFA",  // Almost White (Readable)
        secondary: "#A1A1AA", // Muted Silver
      }
    },
  },
  plugins: [],
};
export default config;
