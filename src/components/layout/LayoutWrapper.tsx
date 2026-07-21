"use client";
import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/components/layout/Components";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if the current path is exactly "/login"
  const isLoginPage = pathname === "/login";

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!isLoginPage && <Footer />}
    </>
  );
}
