"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-stone-50">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center z-10 max-w-7xl mx-auto w-full">
        <div className="font-serif text-2xl font-bold tracking-tight text-navy-900">
          Sovereign<span className="text-gold-500">.</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-medium text-stone-600 hover:text-navy-900 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-5 py-2 text-sm font-medium bg-navy-900 text-white rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl">
            Join Us
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-20 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold tracking-wide text-stone-500 uppercase">
            <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
            The Future of Hospitality
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-medium text-navy-900 leading-[1.1]">
            Curated stays for the <br className="hidden md:block"/>
            <span className="italic text-stone-500">discerning</span> traveler.
          </h1>

          <p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto leading-relaxed">
            A unified platform for premium hotel owners and guests. 
            Experience seamless booking, reimagined.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/login" className="group w-full sm:w-auto px-8 py-4 bg-navy-900 text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-xl shadow-navy-900/10">
              Start Booking
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-navy-900 border border-stone-200 rounded-full font-medium text-lg hover:bg-stone-50 transition-colors hover:border-stone-300">
              List Your Hotel
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 text-center text-stone-400 text-sm">
        © 2026 Sovereign Suites. All rights reserved.
      </footer>
    </main>
  );
}
