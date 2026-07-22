"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVolunteers();
  }, []);

  async function fetchVolunteers() {
    const { data } = await supabase.from("volunteers").select("*");
    setVolunteers(data || []);
  }

  async function handleAccept(volunteer: any) {
    // 1. Insert into the members table (including skills, name, phone, location, email)
    const { error: memberError } = await supabase
      .from("members")
      .insert([
        {
          full_name: volunteer.full_name,
          phone: volunteer.phone,
          location: volunteer.location,
          email: volunteer.email || null,
          skills: volunteer.skills || volunteer.skill || null,
        },
      ]);

    if (memberError) {
      alert("Failed to add to members: " + memberError.message);
      return;
    }

    // 2. Update status to 'accepted' so the client sees the WhatsApp link
    const { error: updateError } = await supabase
      .from("volunteers")
      .update({ status: "accepted" })
      .eq("id", volunteer.id);

    if (updateError) {
      alert("Added to members, but failed to update status: " + updateError.message);
      return;
    }

    alert(`Volunteer accepted, added as a member with skills, and client unlocked for WhatsApp!`);

    // 3. Automatically delete from the volunteers table after giving the client time to detect 'accepted'
    setTimeout(async () => {
      await supabase.from("volunteers").delete().eq("id", volunteer.id);
      fetchVolunteers();
    }, 4000);

    fetchVolunteers();
  }

  async function handleDelete(id: any) {
    // Update status to 'rejected' so the client sees "Application not successful"
    const { error } = await supabase
      .from("volunteers")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      fetchVolunteers();
    }
  }

  const filteredVolunteers = volunteers.filter((v) =>
    v.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Volunteer Submissions</h1>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            placeholder="Search volunteers..."
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
                <th className="py-3.5 px-4 sm:px-6">Name</th>
                <th className="py-3.5 px-4 sm:px-6">Phone</th>
                <th className="py-3.5 px-4 sm:px-6">Location</th>
                <th className="py-3.5 px-4 sm:px-6">M-Pesa Code</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">{v.full_name}</td>
                    <td className="py-4 px-4 sm:px-6">{v.phone}</td>
                    <td className="py-4 px-4 sm:px-6">{v.location}</td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-rose-400">{v.mpesa_code || 'N/A'}</td>
                    <td className="py-4 px-4 sm:px-6">
                      {v.status === "accepted" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle size={12} /> Accepted
                        </span>
                      ) : v.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <XCircle size={12} /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                      {v.status !== "accepted" && v.status !== "rejected" && (
                        <button
                          onClick={() => handleAccept(v)}
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition border border-emerald-500/20"
                        >
                          <CheckCircle size={14} /> Accept
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold p-2 rounded-xl hover:bg-rose-500/10 transition border border-rose-500/20"
                        title="Reject Volunteer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No volunteers recorded yet.
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
