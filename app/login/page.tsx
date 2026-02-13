"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

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

      // SMART REDIRECT: System decides where you go
      if (data.role === "OWNER") {
        router.push("/dashboard/owner");
      } else {
        router.push("/dashboard/guest");
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-stone-200/50 border border-stone-100">
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-navy-900 mb-2">Welcome Back</h2>
            <p className="text-stone-500 text-sm">Enter your credentials to access your suite.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Email</label>
              <input 
                type="email" required 
                className="w-full p-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500/50 outline-none transition-all placeholder:text-stone-300"
                placeholder="you@sovereign.com"
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" required 
                className="w-full p-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500/50 outline-none transition-all placeholder:text-stone-300"
                placeholder="••••••••"
                value={form.password} 
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 mt-2 bg-navy-900 text-white rounded-xl font-medium hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-navy-900/20"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-stone-500">
            No account yet?{' '}
            <Link href="/register" className="text-gold-600 font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
