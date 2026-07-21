"use client";
import { useState, useRef } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CreateEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    title: "", 
    event_date: "", 
    description: "", 
    location: "" 
  });
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = "";

      // 1. Upload image if selected
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        imagePath = data.path;
      }

      // 2. Insert into database
      const { error } = await supabase.from("events").insert([{
        ...formData,
        image_path: imagePath
      }]);

      if (error) throw error;

      alert("Event created successfully!");
      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Event Title</label>
          <Input required placeholder="Enter title" onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="text-sm font-medium">Event Date</label>
          <Input required type="date" onChange={(e) => setFormData({...formData, event_date: e.target.value})} />
        </div>
        <div>
          <label className="text-sm font-medium">Location</label>
          <Input required placeholder="Enter location" onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea 
            required 
            className="w-full p-2 border rounded-md min-h-[100px] text-sm" 
            placeholder="Tell us about the event..."
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
      </div>

      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) setImage(e.dataTransfer.files[0]); }}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-gray-500">{image ? image.name : "Drag & Drop photo here or click to select"}</p>
        <Input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files && setImage(e.target.files[0])} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Event"}
      </Button>
    </form>
  );
}
