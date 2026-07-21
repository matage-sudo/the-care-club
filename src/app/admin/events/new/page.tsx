"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Type, FileText, Upload } from 'lucide-react';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    event_date: '',
    place: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imagePath = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);

      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        setLoading(false);
        return;
      }
      imagePath = fileName;
    }

    const { error } = await supabase.from('events').insert([
      {
        title: form.title,
        event_date: form.event_date,
        place: form.place,
        description: form.description,
        image_path: imagePath,
      },
    ]);

    if (error) {
      alert('Error creating event: ' + error.message);
      setLoading(false);
    } else {
      router.push('/admin/events');
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-white py-6 space-y-6">
      <div>
        <Link href="/admin/events" className="text-slate-400 hover:text-white flex items-center gap-2 mb-2 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Events
        </Link>
        <h1 className="text-3xl font-black text-white">Create New Event</h1>
        <p className="text-slate-400 text-sm mt-1">Publish an upcoming activity or community event.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Type size={16} className="text-rose-500" /> Event Name / Title
          </label>
          <input
            type="text"
            required
            placeholder="Enter title"
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Calendar size={16} className="text-rose-500" /> Event Date
            </label>
            <input
              type="date"
              required
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={form.event_date}
              onChange={(e) => setForm({ ...form, event_date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <MapPin size={16} className="text-rose-500" /> Location / Place
            </label>
            <input
              type="text"
              required
              placeholder="Enter location"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <FileText size={16} className="text-rose-500" /> Description
          </label>
          <textarea
            required
            rows={5}
            placeholder="Provide event details..."
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Upload size={16} className="text-rose-500" /> Event Banner / Photo
          </label>
          <div className="border-2 border-dashed border-slate-800 bg-slate-950 rounded-2xl p-6 text-center hover:border-slate-700 transition">
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-700 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-lg disabled:opacity-50"
        >
          {loading ? 'Publishing Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
