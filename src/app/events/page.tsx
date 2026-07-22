import { supabase } from "@/utils/supabase";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Events | The Care Club",
  description: "View our upcoming and past events.",
};

const EventCard = ({ event }: { event: any }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
    <div className="relative h-60">
      <Image
        src={event.image_path ? supabase.storage.from("event-images").getPublicUrl(event.image_path).data.publicUrl : "/placeholder.jpg"}
        alt={event.title}
        fill
        className="object-cover"
      />
    </div>
    {/* Added the p-6 wrapper here so content isn't flush against the edges */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">{event.title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-slate-500 text-sm font-medium">
          <Calendar className="h-4 w-4 mr-2 text-rose-500" />
          {new Date(event.event_date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-slate-500 text-sm font-medium">
          <MapPin className="h-4 w-4 mr-2 text-rose-500" />
          {event.location}
        </div>
      </div>
      <p className="text-slate-700 leading-relaxed" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        {event.description}
      </p>
    </div>
  </div>
);

export default async function EventsPage() {
  const { data: events } = await supabase.from("events").select("*");
  const today = new Date();

  const upcomingEvents = events?.filter(e => new Date(e.event_date) >= today) || [];
  const pastEvents = events?.filter(e => new Date(e.event_date) < today) || [];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Our Events</h1>
          <p className="text-lg text-slate-600">Join us in our journey of impact.</p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b-2 border-rose-500 inline-block pb-2">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <p className="text-slate-500 italic">No upcoming events scheduled.</p>
          )}
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b-2 border-slate-300 inline-block pb-2">Past Events</h2>
          {pastEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80">
              {pastEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <p className="text-slate-500 italic">No past events recorded.</p>
          )}
        </section>
      </div>
    </div>
  );
}
