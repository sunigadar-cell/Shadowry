"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "GUEST" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (!res.ok) setError(data.error);
    else router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface p-8 rounded-2xl border border-border shadow-2xl"
      >
        <h2 className="font-serif text-3xl text-white text-center mb-2">Join Sovereign</h2>
        <p className="text-secondary text-center mb-6 text-sm">Create your personal account.</p>

        {error && <div className="bg-red-900/20 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" required placeholder="Full Name"
            className="w-full p-4 bg-background border border-border rounded-xl text-white focus:border-gold-500 outline-none"
            value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <input type="email" required placeholder="Email"
            className="w-full p-4 bg-background border border-border rounded-xl text-white focus:border-gold-500 outline-none"
            value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <input type="password" required placeholder="Password"
            className="w-full p-4 bg-background border border-border rounded-xl text-white focus:border-gold-500 outline-none"
            value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <div className="grid grid-cols-2 gap-2 p-1 bg-background rounded-xl border border-border">
             <button type="button" onClick={() => setForm({...form, role: "GUEST"})}
               className={`py-3 text-sm font-medium rounded-lg transition-all ${form.role === "GUEST" ? "bg-surface text-white border border-border" : "text-gray-500"}`}>
               Guest
             </button>
             <button type="button" onClick={() => setForm({...form, role: "OWNER"})}
               className={`py-3 text-sm font-medium rounded-lg transition-all ${form.role === "OWNER" ? "bg-surface text-white border border-border" : "text-gray-500"}`}>
               Hotel Owner
             </button>
          </div>

          <button disabled={loading} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex justify-center gap-2">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Create Account"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-secondary">
          Already a member? <Link href="/login" className="text-gold-500 hover:underline">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
