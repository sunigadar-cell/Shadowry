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
        gold: {
          400: "#D4AF37",
          500: "#C5A028",
          600: "#B08D22",
        },
        navy: {
          900: "#0F172A",
        }
      }
    },
  },
  plugins: [],
};
export default config;
