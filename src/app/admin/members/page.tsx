"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Trash2, UserPlus } from "lucide-react";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMember, setNewMember] = useState({ full_name: "", phone: "", location: "", skills: "" });

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const { data } = await supabase.from("members").select("*");
    setMembers(data || []);
  }

  async function handleDelete(id: any) {
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) alert("Delete failed: " + error.message);
    else fetchMembers();
  }

  async function handleAdd() {
    const { error } = await supabase.from("members").insert([newMember]);
    if (error) alert("Add failed: " + error.message);
    else {
      setNewMember({ full_name: "", phone: "", location: "", skills: "" });
      fetchMembers();
    }
  }

  const filteredMembers = members.filter((m) =>
    m.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Member Management</h1>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            placeholder="Search members by name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Manual Add Form */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <UserPlus size={20} className="text-rose-500" /> Add New Member
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            placeholder="Full Name"
            className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={newMember.full_name}
            onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
          />
          <input
            placeholder="Location"
            className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={newMember.location}
            onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
          />
          <input
            placeholder="Skills"
            className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={newMember.skills}
            onChange={(e) => setNewMember({ ...newMember, skills: e.target.value })}
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-700 transition shadow-lg"
        >
          Add Member
        </button>
      </div>

      {/* Members Table - Responsive Wrapper */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Name</th>
                <th className="py-3.5 px-4 sm:px-6">Phone</th>
                <th className="py-3.5 px-4 sm:px-6">Location</th>
                <th className="py-3.5 px-4 sm:px-6">Skills</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">{m.full_name}</td>
                    <td className="py-4 px-4 sm:px-6">{m.phone}</td>
                    <td className="py-4 px-4 sm:px-6">{m.location}</td>
                    <td className="py-4 px-4 sm:px-6">{m.skills}</td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold p-2 rounded-xl hover:bg-rose-500/10 transition border border-rose-500/20"
                        title="Delete Member"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm font-medium">
                    No members found.
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
