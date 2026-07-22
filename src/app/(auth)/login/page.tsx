"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Loader2, HeartHandshake, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const user = data?.user;

    if (!user) {
      setLoading(false);
      setErrorMsg("Authentication failed. No user found.");
      return;
    }

    // Check the profiles table dynamically in Supabase
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("admin")
      .eq("email", user.email?.toLowerCase())
      .single();

const isAdmin = !profileError && (
  profileData?.admin === true || 
  profileData?.admin === "true" || 
  profileData?.admin === "TRUE"
);
    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoading(false);
      setErrorMsg("Access Denied: Administrator privileges required.");
      return;
    }

    if (data?.session) {
      router.refresh();
      router.push("/admin");
    } else {
      setLoading(false);
      setErrorMsg("Session initialization failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-indigo-500/20 border border-rose-500/30 text-rose-400 shadow-inner mb-4">
            <HeartHandshake size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">The Care Club</h1>
          <p className="text-xs font-semibold bg-gradient-to-r from-rose-400 to-indigo-400 bg-clip-text text-transparent tracking-widest uppercase mt-1">
            Executive Portal
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-4 rounded-xl flex items-start gap-3">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span className="leading-tight">{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block ml-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                placeholder="admin@thecareclub.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 active:scale-[0.99] transition-all text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-rose-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin text-white" size={18} />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
