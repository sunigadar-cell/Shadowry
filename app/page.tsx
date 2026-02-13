"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background text-white selection:bg-gold-500/30">
      
      {/* Glow Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Nav */}
      <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-10">
        <div className="font-serif text-2xl font-bold flex items-center gap-2">
          <span className="w-8 h-8 bg-gold-500 rounded-br-xl rounded-tl-xl flex items-center justify-center text-black font-bold">S</span>
          Sovereign
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm text-secondary hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-5 py-2 text-sm bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all">
            Join Us
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-semibold text-gold-500 uppercase tracking-wide">
            <ShieldCheck className="w-3 h-3" /> Premier Security
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight">
            The Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-600">
              Modern Hospitality
            </span>
          </h1>

          <p className="text-lg text-secondary max-w-xl mx-auto">
            A unified sanctuary for hotel owners and discerning guests. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/login" className="px-8 py-4 bg-gold-500 text-black rounded-full font-bold flex items-center gap-2 hover:bg-gold-400 transition-all">
              Start Booking <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
