'use server'

import { supabase } from '@/lib/supabase';

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data;
}

export async function createEvent(formData: any) {
  const { data, error } = await supabase
    .from('events')
    .insert([formData])
    .select();

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  return { success: true, message: "Event created successfully!", data };
}
