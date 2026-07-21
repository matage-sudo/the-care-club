"use client";
import { useState } from "react";
import { CheckCircle2, Baby, BookOpen, Droplets, Users, BrainCircuit, Mic, Home, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SectionHeader = ({ title, desc }: { title: string, desc?: string }) => (
  <div className="text-center mb-12 px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    {desc && <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">{desc}</p>}
  </div>
);

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"stk" | "till" | null>(null);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [status, setStatus] = useState("pending");
  const [formData, setFormData] = useState({
    full_name: "", phone: "", location: "", skills: "",
    availability: "", expectations: "", mpesa_code: ""
  });

  const TILL_NUMBER = "9707077";
  const WHATSAPP_LINK = "https://chat.whatsapp.com/CWJpgiDHDLp8QHsc0OcAUQ";

  function validateStep1() {
    if (!formData.full_name || !formData.phone || !formData.location || !formData.expectations) {
      alert("Please fill in all required fields (Name, Phone, Location, Expectations).");
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (paymentMethod === "till" && !formData.mpesa_code) {
      alert("Please enter the M-Pesa confirmation code.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.from("volunteers").insert([{ ...formData, status: "pending" }]).select();
    setLoading(false);

    if (!error && data && data.length > 0) {
      setSubmitted(true);
      const volunteerId = data[0].id;

      const interval = setInterval(async () => {
        const { data: updated } = await supabase.from("volunteers").select("status").eq("id", volunteerId).single();
        if (updated?.status === "accepted") {
          setStatus("accepted");
          clearInterval(interval);
        }
      }, 5000);
    } else if (error) {
      alert("Error saving submission: " + error.message);
    }
  }

  const copyTill = () => {
    navigator.clipboard.writeText(TILL_NUMBER);
    alert("Till number copied!");
  };

  const serviceAreas = [
    { title: "Children's Homes", desc: "Bringing joy and companionship.", icon: Baby },
    { title: "School Support", desc: "Empowering students.", icon: BookOpen },
    { title: "Pad Drives", desc: "Supporting hygiene and dignity.", icon: Droplets },
    { title: "Team Building", desc: "Fostering unity.", icon: Users },
    { title: "Mentorship", desc: "Guiding the next generation.", icon: BrainCircuit },
    { title: "Counseling", desc: "Providing support.", icon: Mic },
    { title: "Community Outreach", desc: "Uplifting neighborhoods.", icon: Home },
    { title: "Elderly Care", desc: "Honoring our seniors.", icon: ShieldCheck }
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Quote Section */}
      <section className="py-16 md:py-24 text-center px-4 bg-white border-b">
        <blockquote className="italic text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-8 font-serif px-2">
  &ldquo;I slept &amp; dreamt that life is all joy. I woke &amp; saw that life is all service.&rdquo;
</blockquote>
      </section>

      {/* Service Areas Section */}
      <section className="max-w-6xl mx-auto py-12 md:py-16 px-4">
        <SectionHeader title="Our Areas of Service" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceAreas.map((area, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start">
              <area.icon className="w-8 h-8 text-rose-600 mb-4" />
              <h3 className="font-bold mb-2 text-slate-900">{area.title}</h3>
              <p className="text-sm text-slate-600">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form / Payment Container */}
      <section className="max-w-xl mx-auto py-12 md:py-16 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-t-4 border-rose-600">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              {status === "pending" ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Registration Received</h2>
                  <p className="text-slate-600 text-sm md:text-base">Please wait for admin confirmation to join our WhatsApp group.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4">Application Accepted!</h2>
                  <a href={WHATSAPP_LINK} target="_blank" className="text-blue-600 font-bold underline break-all">
                    Click to join the Care Club WhatsApp group
                  </a>
                </>
              )}
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Registration</h2>
              
              <input 
                required 
                placeholder="Full Name" 
                className="w-full p-3 border rounded-lg text-sm md:text-base" 
                value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })} 
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  required 
                  placeholder="Phone" 
                  className="w-full p-3 border rounded-lg text-sm md:text-base" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                />
                <input 
                  required 
                  placeholder="Location" 
                  className="w-full p-3 border rounded-lg text-sm md:text-base" 
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })} 
                />
              </div>

              <input 
                placeholder="Skills" 
                className="w-full p-3 border rounded-lg text-sm md:text-base" 
                value={formData.skills}
                onChange={e => setFormData({ ...formData, skills: e.target.value })} 
              />
              
              <input 
                placeholder="Availability" 
                className="w-full p-3 border rounded-lg text-sm md:text-base" 
                value={formData.availability}
                onChange={e => setFormData({ ...formData, availability: e.target.value })} 
              />
              
              <textarea 
                placeholder="Expectations" 
                required 
                rows={4}
                className="w-full p-3 border rounded-lg text-sm md:text-base" 
                value={formData.expectations}
                onChange={e => setFormData({ ...formData, expectations: e.target.value })} 
              />
              
              <button 
                onClick={() => validateStep1() && setStep(2)} 
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition"
              >
                Proceed to Payment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Payment (1000 KES)</h2>

              {!paymentMethod && (
                <div className="space-y-3">
                  <button 
                    onClick={() => { setPaymentMethod("stk"); setShowUnavailable(true); }} 
                    className="w-full p-4 border-2 rounded-xl text-left font-medium hover:border-slate-900 transition"
                  >
                    M-Pesa STK Push (Automatic)
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("till")} 
                    className="w-full p-4 border-2 rounded-xl text-left font-medium hover:border-slate-900 transition"
                  >
                    M-Pesa Till Number (Manual Code Entry)
                  </button>
                </div>
              )}

              {showUnavailable && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 space-y-3 animate-fadeIn">
                  <p className="font-bold">Service currently unavailable.</p>
                  <p className="text-sm">Please use Till Number instead:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 border border-red-300 rounded-lg gap-2">
                    <span className="font-mono font-bold text-lg">{TILL_NUMBER}</span>
                    <button onClick={copyTill} className="w-full sm:w-auto bg-slate-800 text-white px-3 py-1.5 rounded text-sm font-medium">
                      Copy Till
                    </button>
                  </div>
                  <button 
                    onClick={() => { setShowUnavailable(false); setPaymentMethod("till"); }} 
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-medium text-sm"
                  >
                    Switch to Till Number
                  </button>
                </div>
              )}

              {paymentMethod === "till" && !showUnavailable && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">Pay to Till: <strong className="text-slate-900">{TILL_NUMBER}</strong> (Lynette Jemimah Zir)</p>
                  <button onClick={copyTill} className="w-full bg-slate-100 py-2.5 rounded-lg font-bold text-sm text-slate-800 border">
                    Copy Till Number
                  </button>
                  <input 
                    required 
                    placeholder="Enter M-Pesa Confirmation Code" 
                    className="w-full p-3 border rounded-lg text-sm md:text-base uppercase" 
                    value={formData.mpesa_code}
                    onChange={e => setFormData({ ...formData, mpesa_code: e.target.value })}
                  />
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>
              )}

              <button 
                onClick={() => { setStep(1); setPaymentMethod(null); setShowUnavailable(false); }} 
                className="w-full bg-slate-200 text-slate-800 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-300 transition mt-4"
              >
                Back to Details
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
