import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css"; // <--- THIS LINE IS CRITICAL

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sovereign Suites",
  description: "A luxury hotel booking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-white">
        {children}
      </body>
    </html>
  );
}
