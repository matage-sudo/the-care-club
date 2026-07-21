"use client";

import { Facebook, Instagram, Music, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/stories", label: "Our Stories" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="The Care Club Logo"
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
              style={{ width: 'auto', height: '4rem' }}
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rose-600",
                  pathname === route.href ? "text-rose-600" : "text-slate-600"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-rose-600 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-2 text-base font-medium transition-colors",
                pathname === route.href ? "text-rose-600 font-semibold" : "text-slate-700 hover:text-rose-600"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">

        {/* 1. Branding & Logo */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl flex items-center gap-2 text-white">
            <Heart className="text-rose-500 shrink-0" /> TheCareClub
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering communities and spreading hope to those who need it most.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="font-bold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-slate-400 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
            <li><Link href="/volunteer" className="hover:text-white transition">Volunteer</Link></li>
            <li><Link href="/stories" className="hover:text-white transition">Our Stories</Link></li>
            <li><Link href="/donate" className="hover:text-white transition">Donate</Link></li>
          </ul>
        </div>

        {/* 3. Legal & Follow Us */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-white">Follow Us</h4>
            <div className="flex flex-wrap gap-4 items-center pt-1">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 text-slate-400 transition">
                <Facebook size={22} />
              </Link>
              <Link href="https://www.instagram.com/its_thecareclub" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 text-slate-400 transition">
                <Instagram size={22} />
              </Link>
              <Link href="https://tiktok.com/@thecareclub23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-rose-500 text-slate-400 transition">
                <Music size={22} />
                <span className="text-sm font-medium">The Care Club</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Contact Us */}
        <div>
          <h4 className="font-bold mb-4 text-white">Contact Us</h4>
          <div className="text-slate-400 text-sm space-y-2.5">
            <p>Nairobi, Kenya</p>
            <p>+254 769 456 044</p>
            <p>+254 798 871 946</p>
            <p className="break-all">thecareclub@gmail.com</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
