"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Trash2, Calendar, MapPin } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    setEvents(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } else {
      alert("Failed to delete event");
    }
  }

  return (
    <div className="max-w-6xl mx-auto text-white py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Events Management</h1>
          <p className="text-slate-400 text-sm mt-1">Create, review, and manage upcoming community events.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg w-fit"
        >
          <PlusCircle size={18} /> Create Event
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <p>No events scheduled yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const imageUrl = event.image_path
              ? supabase.storage.from("event-images").getPublicUrl(event.image_path).data.publicUrl
              : null;

            return (
              <div key={event.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  {imageUrl ? (
                    <div className="h-48 w-full relative bg-slate-950">
                      <img src={imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-slate-950 flex items-center justify-center text-slate-600 text-sm font-medium">
                      No Media Attached
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                      {event.event_date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-rose-500" /> {event.event_date}
                        </span>
                      )}
                      {event.place && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-rose-500" /> {event.place}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-end border-t border-slate-800/60 mt-4 pt-4">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-rose-500/20"
                  >
                    <Trash2 size={14} /> Delete Event
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
