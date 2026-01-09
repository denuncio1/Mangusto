import { supabase } from "./supabaseClient";

export async function fetchCids(query: string) {
  // Busca por código ou descrição (case-insensitive)
  const { data, error } = await supabase
    .from("cids")
    .select("*")
    .or(`codigo.ilike.%${query}%,descricao.ilike.%${query}%`)
    .limit(20);
  if (error) throw error;
  return data;
}
