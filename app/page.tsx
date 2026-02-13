"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background text-primary selection:bg-gold-500/30 selection:text-gold-400">
      
      {/* Background Glow - Subtle Gold Ambient Light */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-7xl mx-auto">
        <div className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="w-8 h-8 bg-gold-500 rounded-br-xl rounded-tl-xl flex items-center justify-center text-black font-bold text-lg">S</span>
          Sovereign
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-medium text-secondary hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gold-400 hover:text-black transition-all shadow-lg hover:shadow-gold-500/20">
            Join Us
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border shadow-sm text-xs font-semibold tracking-wide text-gold-400 uppercase">
            <ShieldCheck className="w-3 h-3" />
            Premier Security & Privacy
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight">
            The Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">
              Modern Hospitality
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-secondary max-w-xl mx-auto leading-relaxed">
            A unified sanctuary for hotel owners and discerning guests. 
            Manage your empire or book your escape with absolute clarity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/login" className="group w-full sm:w-auto px-8 py-4 bg-gold-500 text-black rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-gold-400 hover:scale-105 shadow-xl shadow-gold-500/10">
              Start Booking
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-surface text-white border border-border rounded-full font-medium text-lg hover:bg-white/5 transition-colors">
              List Your Hotel
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats / Footer Minimal */}
      <footer className="py-8 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-secondary text-sm">
          <p>© 2026 Sovereign Suites. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
