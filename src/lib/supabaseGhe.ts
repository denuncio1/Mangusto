import { supabase } from "./supabaseClient";
import { Ghe } from "@/types/ghe";

export async function fetchGhes(): Promise<Ghe[]> {
  const { data, error } = await supabase.from("ghe").select("*");
  if (error) throw error;
  return data;
}

export async function fetchGheById(id: number): Promise<Ghe> {
  const { data, error } = await supabase.from("ghe").select("*").eq("id_sst", id).single();
  if (error) throw error;
  return data;
}

export async function insertGhe(ghe: Ghe): Promise<Ghe> {
  const { data, error } = await supabase.from("ghe").insert([ghe]).select().single();
  if (error) throw error;
  return data;
}

export async function updateGhe(id: number, ghe: Ghe): Promise<void> {
  const { error } = await supabase.from("ghe").update(ghe).eq("id_sst", id);
  if (error) throw error;
}

export async function deleteGhe(id: number): Promise<void> {
  const { error } = await supabase.from("ghe").delete().eq("id_sst", id);
  if (error) throw error;
}
