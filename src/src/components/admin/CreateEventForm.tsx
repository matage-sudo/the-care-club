"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2),
  date: z.string(),
  description: z.string(),
});

export function CreateEventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-4 p-6 border rounded-xl">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Event Title</FormLabel>
            <FormControl><Input {...field} /></FormControl>
          </FormItem>
        )}/>
        <Button type="submit">Post Event</Button>
      </form>
    </Form>
  );
}
