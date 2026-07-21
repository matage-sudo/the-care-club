"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, Heart, DollarSign, FileText } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Members", path: "/admin/members", icon: Users },
    { name: "Events", path: "/admin/events", icon: Calendar },
    { name: "Volunteers", path: "/admin/volunteers", icon: Heart },
    { name: "Donations", path: "/admin/donations", icon: DollarSign },
    { name: "Stories & News", path: "/admin/stories", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col border-r border-slate-800">
      <h2 className="text-2xl font-bold mb-10 text-rose-500 tracking-wider">Care Club</h2>
      <nav className="space-y-1.5 flex-grow">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
