import { Phone, MapPin, Mail, Instagram, Facebook, MessageCircle, Music } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 md:mb-12 text-slate-900 text-center md:text-left">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-6 sm:space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 md:bg-transparent md:p-0 md:border-0 md:shadow-none">
            <div className="flex gap-4 items-start">
              <Phone className="text-rose-600 h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">Call or WhatsApp</h3>
                <p className="text-slate-600 text-sm sm:text-base">+254 769 456 044</p>
                <p className="text-slate-600 text-sm sm:text-base">+254 798 871 946</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="text-rose-600 h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">Email</h3>
                <p className="text-slate-600 text-sm sm:text-base break-all">careclub@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <MapPin className="text-rose-600 h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">Our Location</h3>
                <p className="text-slate-600 text-sm sm:text-base">Nairobi, Kenya</p>
              </div>
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="font-bold mb-3 text-slate-900">Reach Us On</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="#" className="hover:text-rose-600 transition text-slate-700" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="#" className="hover:text-rose-600 transition text-slate-700" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="https://chat.whatsapp.com/CWJpgiDHDLp8QHsc0OcAUQ" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition text-green-600" aria-label="WhatsApp">
                  <MessageCircle size={24} />
                </a>
                <a href="#" className="hover:text-rose-600 transition text-slate-700" aria-label="TikTok">
                  <Music size={24} />
                </a>
                <span className="font-medium text-sm text-slate-600 ml-1">The Care Club</span>
              </div>
            </div>
          </div>

          {/* Placeholder area */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-center min-h-[200px] md:min-h-[300px]">
            <p className="text-slate-500 text-sm sm:text-base">We look forward to hearing from you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
