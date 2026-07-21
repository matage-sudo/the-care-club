"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // We actually installed react-hook-form, let's just do standard manual fetch or use react-hook-form
  // I will use standard state for simplicity to avoid import issues if any, but I installed react-hook-form.
  // Wait, my import above is `useForm from "react-form-hook"`. It should be `"react-hook-form"`.
  // Let's rewrite it quickly.
  
  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
    }}>
      {isSuccess ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2">Thank you!</h3>
          <p>Your volunteer application has been received. We will contact you soon.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
              <input required id="name" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white transition-colors" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
              <input required id="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
            <input required id="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white transition-colors" />
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium text-slate-700">Skills & Interests</label>
            <textarea required id="skills" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white transition-colors" placeholder="What are you good at? What interests you?"></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium text-slate-700">Previous Volunteer Experience (Optional)</label>
            <textarea id="experience" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white transition-colors" placeholder="Tell us if you've volunteered before."></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Application"}
          </button>
        </>
      )}
    </form>
  );
}
