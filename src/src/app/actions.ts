"use client";
import { useForm } from "react-hook-form";
import { createEvent } from "@/app/actions"; // Import the server action

export function CreateEventForm() {
  const form = useForm();

  async function onSubmit(data: any) {
    const result = await createEvent(data);
    if (result.success) {
      alert(result.message);
    }
  }

  // ... keep the existing form JSX here
  // Ensure you use form.handleSubmit(onSubmit) in your <form> tag
}
