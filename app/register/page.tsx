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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/50 border border-border">
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-white mb-2">Join Sovereign</h2>
            <p className="text-secondary text-sm">Create your personal account to begin.</p>
          </div>

          {error && (
            <div className="bg-red-900/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center border border-red-900/50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider ml-1">Full Name</label>
              <input 
                type="text" required 
                className="w-full p-4 bg-background border border-border rounded-xl text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="John Doe"
                value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider ml-1">Email</label>
              <input 
                type="email" required 
                className="w-full p-4 bg-background border border-border rounded-xl text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="john@example.com"
                value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" required 
                className="w-full p-4 bg-background border border-border rounded-xl text-white focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="Min 8 characters"
                value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            {/* Role Toggle */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider ml-1">I am a:</label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-background rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => setForm({...form, role: "GUEST"})}
                  className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    form.role === "GUEST" 
                    ? "bg-surface text-white shadow-md border border-border" 
                    : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Guest
                </button>
                <button
                  type="button"
                  onClick={() => setForm({...form, role: "OWNER"})}
                  className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    form.role === "OWNER" 
                    ? "bg-surface text-white shadow-md border border-border" 
                    : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Hotel Owner
                </button>
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="w-full py-4 mt-6 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-secondary">
            Already a member?{' '}
            <Link href="/login" className="text-gold-500 font-medium hover:text-gold-400 hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
