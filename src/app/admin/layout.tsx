import { Sidebar } from "../../components/admin/Sidebar";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white relative">
      {/* Sidebar for Desktop/Laptop screens */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content Container (Pushed right on desktop to clear the fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Responsive Header */}
        <header className="bg-slate-900 border-b border-slate-800 h-16 px-4 sm:px-8 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-400 truncate">
            Admin Dashboard
          </div>
          <div className="flex items-center">
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 text-sm font-semibold transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </header>

        {/* Page Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-950 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
