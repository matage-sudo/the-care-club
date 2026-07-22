import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: story } = await supabase
    .from("news")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!story) {
    notFound();
  }

  let paths: string[] = [];
  try {
    paths = JSON.parse(story.image_path || "[]");
  } catch {
    if (story.image_path) paths = [story.image_path];
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-24 pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/stories" className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Stories
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-4">
          <Calendar size={14} />
          <span>{new Date(story.created_at).toLocaleDateString()}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">{story.title}</h1>

        {/* Media Gallery Grid */}
        {paths.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {paths.map((path, index) => {
              const { data } = supabase.storage.from("event-images").getPublicUrl(path);
              const isVideo = path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov');

              return (
                <div key={index} className={`relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 ${paths.length === 1 ? 'sm:col-span-2 h-[400px]' : 'h-64'}`}>
                  {isVideo ? (
                    <video controls src={data.publicUrl} className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={data.publicUrl}
                      alt={`${story.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
          {story.content}
        </div>
      </div>
    </main>
  );
}
