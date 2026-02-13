"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "GUEST" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-stone-200/50 border border-stone-100">
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-navy-900 mb-2">Join Sovereign</h2>
            <p className="text-stone-500 text-sm">Create your account to begin.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Full Name</label>
              <input 
                type="text" required 
                className="w-full p-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500/50 outline-none"
                placeholder="John Doe"
                value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Email</label>
              <input 
                type="email" required 
                className="w-full p-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500/50 outline-none"
                placeholder="john@example.com"
                value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" required 
                className="w-full p-4 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500/50 outline-none"
                placeholder="Min 8 characters"
                value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">I am a:</label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-stone-50 rounded-xl">
                <button
                  type="button"
                  onClick={() => setForm({...form, role: "GUEST"})}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    form.role === "GUEST" ? "bg-white shadow-sm text-navy-900" : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  Guest
                </button>
                <button
                  type="button"
                  onClick={() => setForm({...form, role: "OWNER"})}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    form.role === "OWNER" ? "bg-white shadow-sm text-navy-900" : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  Hotel Owner
                </button>
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="w-full py-4 mt-4 bg-navy-900 text-white rounded-xl font-medium hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy-900/20"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-stone-500">
            Already a member?{' '}
            <Link href="/login" className="text-gold-600 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
