export async function updateFuncionario(id, funcionario) {
  const { error } = await supabase
    .from("funcionario")
    .update(funcionario)
    .eq("id_sst", id);
  if (error) throw error;
}
export async function fetchFuncionarioById(id) {
  const { data, error } = await supabase
    .from("funcionario")
    .select("*, ghe(*)")
    .eq("id_sst", id)
    .single();
  if (error) throw error;
  return data;
}
export async function deleteFuncionario(id) {
  const { error } = await supabase
    .from("funcionario")
    .delete()
    .eq("id_sst", id);
  if (error) throw error;
}
import { supabase } from "./supabaseClient";

export async function fetchFuncionarios() {
  const { data, error } = await supabase
    .from("funcionario")
    .select("*, ghe(*)");
  if (error) throw error;
  return data;
}

export async function insertFuncionario(funcionario) {
  const { data, error } = await supabase
    .from("funcionario")
    .insert([funcionario]);
  if (error) throw error;
  return data;
}
