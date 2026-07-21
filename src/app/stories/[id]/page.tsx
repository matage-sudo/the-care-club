import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";

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

  const { data } = supabase.storage
    .from("event-images")
    .getPublicUrl(story.image_path || "");

  const hasImage = story.image_path && story.image_path.trim() !== "";

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

        {hasImage && (
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 bg-slate-900 border border-slate-800">
            <Image
              src={data.publicUrl}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
          {story.content}
        </div>
      </div>
    </main>
  );
}
