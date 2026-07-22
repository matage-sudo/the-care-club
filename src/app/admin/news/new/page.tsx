"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, Calendar, MapPin, MessageSquare, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewNewsAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let imagePaths: string[] = [];

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('event-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;
          imagePaths.push(filePath);
        }
      }

      const { error: insertError } = await supabase
        .from('news')
        .insert([
          {
            title,
            event_date: eventDate,
            place,
            content,
            image_path: JSON.stringify(imagePaths), // Store multiple file paths as a JSON string
          },
        ]);

      if (insertError) throw insertError;

      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while publishing.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <Link href="/admin" className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-black mb-2 text-white">Add New Story / Update</h1>
        <p className="text-slate-400 text-sm mb-8">Publish multiple pictures, videos, and comments for community events visible to clients.</p>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-6 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <Tag size={14} className="text-rose-500" /> Event Name / Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Juja Community Outreach"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-rose-500" /> Event Date
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                <MapPin size={14} className="text-rose-500" /> Location / Place
              </label>
              <input
                type="text"
                required
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. Nairobi, Kenya"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <ImageIcon size={14} className="text-rose-500" /> Media Files (Select Multiple Pictures/Videos)
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setFiles(e.target.files)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition-all cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <MessageSquare size={14} className="text-rose-500" /> Comments & Description
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share details, remarks, or highlights about how the event went..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish to Stories'}
          </button>
        </form>
      </div>
    </main>
  );
}
