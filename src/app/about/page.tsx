import Image from "next/image";
import { Heart, Target, Eye, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Hope Foundation",
  description: "Learn about our history, mission, vision, and the team behind Hope Foundation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/hero.jpg"
            fill
            alt="Hero background"
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6">
            About The Care Club
          </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
  We believe that small acts of kindness can change the world. Since our founding, we&apos;ve been dedicated to making a lasting impact.
</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Mission Box */}
            <div className="bg-rose-50 rounded-3xl p-6 sm:p-10 border border-rose-100 flex flex-col justify-between">
              <div>
                <div className="bg-white w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-rose-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  To empower communities through education, sustainable resources, and emergency relief, ensuring every individual has the opportunity to thrive.
                </p>
              </div>
            </div>

            {/* Vision Box */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="bg-white w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8 text-slate-900" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  A world where poverty and inequality are eliminated, and every community is self-sustaining and resilient.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
              The principles that guide our work every single day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <Heart className="h-10 w-10 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Compassion</h3>
              <p className="text-sm sm:text-base text-slate-600">We act with empathy and understanding in everything we do.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <Users className="h-10 w-10 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Community</h3>
              <p className="text-sm sm:text-base text-slate-600">We believe in the power of working together to solve problems.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 sm:col-span-2 md:col-span-1">
              <Target className="h-10 w-10 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Integrity</h3>
              <p className="text-sm sm:text-base text-slate-600">We are transparent, accountable, and honest in all our operations.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
