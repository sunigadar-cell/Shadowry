"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Lock } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.role === "OWNER") router.push("/dashboard/owner");
      else router.push("/dashboard/guest");
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/50 border border-border">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500">
                <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-2">Welcome Back</h2>
            <p className="text-secondary text-sm">Enter your credentials to access your suite.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-900/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center border border-red-900/50"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider ml-1">Email Address</label>
              <input 
                type="email" required 
                className="w-full p-4 bg-background border border-border rounded-xl text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="you@sovereign.com"
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" required 
                className="w-full p-4 bg-background border border-border rounded-xl text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="••••••••"
                value={form.password} 
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 mt-2 bg-gold-500 text-black rounded-xl font-bold hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-secondary">
            No account yet?{' '}
            <Link href="/register" className="text-gold-500 font-medium hover:text-gold-400 hover:underline transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
