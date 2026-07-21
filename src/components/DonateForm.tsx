"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DonateForm() {
  const [amount, setAmount] = useState<number | string>(50);
  const [name, setName] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  
  const presetAmounts = [20, 50, 100, 200, 500, 1000, 10000];

  const handleSTKPush = async () => {
    setLoading(true);
    try {
    // Inside DonateForm.tsx, inside the handleSTKPush function:
const response = await fetch("/api/stkpush", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    amount: amount, 
    phoneNumber: phone, // We use 'phoneNumber' to match the route.ts logic
    first_name: name.split(" ")[0] || "Valued",
    last_name: name.split(" ")[1] || "Donor",
    email: "donor@thecareclub.com"
  }),
});

      const data = await response.json();

      if (data.success) {
        alert("Request sent! Check your phone for the M-Pesa prompt.");
      } else {
        alert("Error: " + (data.error || "Payment initiation failed"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm max-w-md">
      <h2 className="text-xl font-bold mb-4">Support Makes a Difference</h2>

      {!showPhone ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {presetAmounts.map((val) => (
              <Button
                key={val}
                variant={amount === val ? "default" : "outline"}
                onClick={() => setAmount(val)}
              >
                KES {val}
              </Button>
            ))}
          </div>

          <Input
            type="number"
            placeholder="Enter custom amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setShowPhone(true)}>
            Donate KES {amount}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="font-medium">Enter M-Pesa number (e.g. 254712345678):</p>
          <Input
            placeholder="254XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleSTKPush}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send M-Pesa Prompt"}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setShowPhone(false)}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
