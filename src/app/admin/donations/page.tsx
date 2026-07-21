"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Trash2 } from "lucide-react";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  async function fetchDonations() {
    const { data } = await supabase.from("donations").select("*");
    setDonations(data || []);
  }

  async function handleDelete(id: any) {
    const { error } = await supabase.from("donations").delete().eq("id", id);
    if (error) alert("Delete failed: " + error.message);
    else fetchDonations();
  }

  const filteredDonations = donations.filter((d) =>
    d.donor_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Donation Tracking</h1>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            placeholder="Search donors..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Donor</th>
                <th className="py-3.5 px-4 sm:px-6">Amount</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {filteredDonations.length > 0 ? (
                filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">{d.donor_name || 'Anonymous'}</td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-rose-400">Ksh {d.amount}</td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Verified
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold p-2 rounded-xl hover:bg-rose-500/10 transition border border-rose-500/20"
                        title="Delete Donation"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No donations recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
