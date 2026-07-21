import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, PlusCircle, Users, Calendar, Heart } from 'lucide-react';

export default async function AdminDashboard() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  // 1. Get user and verify session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2. Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  // 3. Fetch statistics including news/stories
  const [
    { count: m }, { count: v }, { count: d }, { count: e }, { count: n }
  ] = await Promise.all([
    supabase.from('members').select('*', { count: 'exact', head: true }),
    supabase.from('volunteers').select('*', { count: 'exact', head: true }),
    supabase.from('donations').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('news').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: "Members", value: m || 0, icon: Users, href: "/admin/members" },
    { label: "Volunteers", value: v || 0, icon: Heart, href: "/admin/volunteers" },
    { label: "Donations", value: d || 0, icon: Heart, href: "/admin/donations" },
    { label: "Events", value: e || 0, icon: Calendar, href: "/admin/events" },
    { label: "Stories & News", value: n || 0, icon: FileText, href: "/admin/news" },
  ];

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black">
              Welcome, {profile?.username || user.email}
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage community activities, content, and participant records.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/admin/news/new" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
            >
              <PlusCircle size={18} /> Add New Story
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Link 
                key={s.label} 
                href={s.href}
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-rose-500/50 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm font-medium">{s.label}</span>
                  <div className="p-2.5 bg-slate-950 rounded-xl text-rose-500 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-3xl font-black text-white">{s.value}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
