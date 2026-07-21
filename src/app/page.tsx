import { ArrowRight, Heart, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import { supabase } from "@/utils/supabase";

export default async function HomePage() {
  // Fetch the 3 most recent events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false })
    .limit(3);

  return (
    <main className="relative min-h-screen">
      <BackgroundSlideshow />

      {/* 1. Hero Section */}
      <section className="text-center pt-32 pb-16 px-4 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Small Actions, Massive Impact.
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Join The Care Club in our mission to empower communities and spread hope, one act at a time.
        </p>
        <Link href="/volunteer">
          <button className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold flex items-center mx-auto hover:bg-rose-700 transition-all">
            Become a Volunteer <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </Link>
      </section>

      {/* 2. Stats Section - Transparent background with visible text */}
      <section className="bg-transparent py-8 flex justify-between items-center px-4 max-w-7xl mx-auto relative z-10 -mb-8">
        {[
          { label: "Active Volunteers", val: "50+" },
          { label: "Lives Impacted", val: "1000+" },
          { label: "Events Held", val: "20+" }
        ].map((stat, i) => (
          <div key={i} className="text-center px-2 flex-1">
            <h2 className="text-3xl md:text-5xl font-extrabold text-rose-500 drop-shadow-md">{stat.val}</h2>
            <p className="text-white mt-1 font-semibold text-xs md:text-base drop-shadow-md">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* 3. Photo-Centric Events Section */}
      <section className="pt-20 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Latest Moments</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {events && events.length > 0 ? (
            events.map((event) => {
              // Get the public URL safely
              const { data } = supabase.storage
                .from("event-images")
                .getPublicUrl(event.image_path || "");

              // Only render if image_path is not empty to prevent 400 errors
              const hasImage = event.image_path && event.image_path.trim() !== "";

              return (
                <div 
                  key={event.id} 
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col text-left group"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 bg-slate-950 overflow-hidden">
                    {hasImage ? (
                      <Image
                        src={data.publicUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details Section Placed Below the Image */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-slate-900 gap-4">
                    <h3 className="text-white text-xl font-bold">{event.title}</h3>

                    <div className="flex flex-col gap-2 text-xs font-medium text-slate-400 pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-rose-400 shrink-0" />
                        <span>{new Date(event.event_date).toLocaleDateString()}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={15} className="text-indigo-400 shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white/70 col-span-3">No events to display at the moment.</p>
          )}
        </div>
      </section>

      {/* 4. Support Section */}
      <section className="py-20 bg-white text-center px-4 rounded-t-[3rem]">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Support Our Cause</h2>
        <p className="mb-8 text-slate-600 max-w-md mx-auto">
          Even if you cannot attend, your donation changes lives and sustains our outreach programs.
        </p>
        <Link href="/donate">
          <button className="bg-rose-600 text-white px-8 py-3 rounded-full flex items-center mx-auto hover:bg-rose-700 transition-all">
            Donate Now <Heart className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </section>
    </main>
  );
}
