"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Lock } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      if (data.role === "OWNER") router.push("/dashboard/owner");
      else router.push("/dashboard/guest");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface p-8 rounded-2xl border border-border shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500">
             <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-3xl text-white">Welcome Back</h2>
        </div>

        {error && <div className="bg-red-900/20 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" required 
            placeholder="Email Address"
            className="w-full p-4 bg-background border border-border rounded-xl text-white focus:border-gold-500 outline-none transition-colors"
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <input 
            type="password" required 
            placeholder="Password"
            className="w-full p-4 bg-background border border-border rounded-xl text-white focus:border-gold-500 outline-none transition-colors"
            value={form.password} 
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          <button disabled={loading} className="w-full py-4 bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 transition-all flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-secondary">
          No account? <Link href="/register" className="text-gold-500 hover:underline">Create one</Link>
        </div>
      </motion.div>
    </div>
  );
}
