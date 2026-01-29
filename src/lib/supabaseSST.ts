import { supabase } from "./supabaseClient";

export async function fetchGHEs() {
  const { data, error } = await supabase
    .from("ghe")
    .select("*");
  if (error) throw error;
  return data;
}

export async function insertGHE(ghe) {
  const { data, error } = await supabase
    .from("ghe")
    .insert([ghe]);
  if (error) throw error;
  return data;
}

export async function fetchRiscos() {
  const { data, error } = await supabase
    .from("risco")
    .select("*, ghe(nome)");
  if (error) throw error;
  return data;
}

export async function insertRisco(risco) {
  const { data, error } = await supabase
    .from("risco")
    .insert([risco]);
  if (error) throw error;
  return data;
}

export async function fetchCATs() {
  const { data, error } = await supabase
    .from("cat")
    .select("*, funcionario(cpf, funcao)");
  if (error) throw error;
  return data;
}

export async function insertCAT(cat) {
  const { data, error } = await supabase
    .from("cat")
    .insert([cat]);
  if (error) throw error;
  return data;
}
