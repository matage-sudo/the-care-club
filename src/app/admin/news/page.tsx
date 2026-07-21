"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { PlusCircle, Trash2, Calendar, MapPin, ArrowLeft } from 'lucide-react';

export default function AdminNewsPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStories() {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setStories(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStories();
  }, []);

  async function handleDelete(id: string, imagePath: string) {
    if (!confirm('Are you sure you want to delete this story?')) return;

    if (imagePath) {
      await supabase.storage.from('event-images').remove([imagePath]);
    }

    const { error } = await supabase.from('news').delete().eq('id', id);

    if (!error) {
      setStories(stories.filter((s) => s.id !== id));
    } else {
      alert('Failed to delete story');
    }
  }

  return (
    <div className="max-w-6xl mx-auto text-white py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/admin" className="text-slate-400 hover:text-white flex items-center gap-2 mb-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black">Manage Stories & News</h1>
          <p className="text-slate-400 text-sm mt-1">Review, add, or delete event stories and community updates.</p>
        </div>

        <Link
          href="/admin/news/new"
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg w-fit"
        >
          <PlusCircle size={18} /> Add New Story
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading stories...</p>
      ) : stories.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <p>No stories published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const imageUrl = story.image_path
              ? supabase.storage.from('event-images').getPublicUrl(story.image_path).data.publicUrl
              : null;

            return (
              <div key={story.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  {imageUrl ? (
                    <div className="h-48 w-full relative bg-slate-950">
                      <img src={imageUrl} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-slate-950 flex items-center justify-center text-slate-600 text-sm font-medium">
                      No Media Attached
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                      {story.event_date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-rose-500" /> {story.event_date}
                        </span>
                      )}
                      {story.place && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-rose-500" /> {story.place}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">{story.content}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-end border-t border-slate-800/60 mt-4 pt-4">
                  <button
                    onClick={() => handleDelete(story.id, story.image_path)}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-rose-500/20"
                  >
                    <Trash2 size={14} /> Delete Story
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
