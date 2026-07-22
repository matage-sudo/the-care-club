import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

export const dynamic = 'force-dynamic';

export default async function StoriesPage() {
  const { data: stories, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-24 pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Stories & News</h1>
          <p className="text-slate-400 text-lg">Follow our journey, community impacts, and updates.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-8">
            Error loading stories: {error.message}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {stories && stories.length > 0 ? (
            stories.map((story) => {
              let paths: string[] = [];
              try {
                paths = JSON.parse(story.image_path || "[]");
              } catch {
                if (story.image_path) paths = [story.image_path];
              }

              const coverPath = paths.length > 0 ? paths[0] : "";
              const { data } = supabase.storage.from("event-images").getPublicUrl(coverPath);
              const hasImage = coverPath.trim() !== "";

              return (
                <div 
                  key={story.id} 
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {hasImage && (
                      <div className="relative w-full h-48 bg-slate-950 overflow-hidden">
                        <Image
                          src={data.publicUrl}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-3">
                        <Calendar size={14} />
                        <span>{new Date(story.created_at).toLocaleDateString()}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 text-white">{story.title}</h2>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {story.content}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link 
                      href={`/stories/${story.id}`} 
                      className="inline-flex items-center text-rose-500 hover:text-rose-400 font-semibold text-sm gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Read Story <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-16 text-slate-500 bg-slate-900/50 rounded-3xl border border-slate-800/80">
              <p className="text-lg">No stories published yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
