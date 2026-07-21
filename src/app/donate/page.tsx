"use client";
import DonateForm from "@/components/DonateForm";
import { BookOpen, Utensils, Shirt, Home } from "lucide-react";

export default function DonatePage() {
  const causes = [
    { icon: BookOpen, title: "Education", desc: "Provides books and stationery." },
    { icon: Utensils, title: "Food", desc: "Provides nutritious meals for families." },
    { icon: Shirt, title: "Clothing", desc: "Provides warm clothes for children." },
    { icon: Home, title: "Shelter", desc: "Helps maintain safe living spaces." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        
        {/* Left Side: Causes */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-slate-900 leading-tight">
            Your Support Makes a Difference
          </h1>
          <div className="space-y-4">
            {causes.map((item, i) => (
              <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-rose-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Donate Form and Till Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
          <DonateForm />

          {/* Manual Payment Section Added Below DonateForm */}
          <div className="border-t border-slate-100 pt-8">
            <p className="text-sm text-slate-600 mb-3 text-center font-medium">
              Or pay directly via M-Pesa
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xl font-mono font-bold text-slate-800">9707077</p>
                <p className="text-xs text-slate-500">Lynette Jemimah Ziro</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("9707077");
                  alert("Till number copied!");
                }}
                className="w-full sm:w-auto bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-700 transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
