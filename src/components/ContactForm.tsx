"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center">
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Subject</label>
        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Message</label>
        <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white"></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-4 px-8 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors disabled:opacity-70 flex justify-center items-center"
      >
        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Send Message"}
      </button>
    </form>
  );
}
