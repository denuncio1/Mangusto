import { supabase } from "./supabaseClient";
import { GheTreinamentoExame } from "@/types/gheTreinamentoExame";

export async function fetchTreinamentosExamesByGhe(id_ghe: number): Promise<GheTreinamentoExame[]> {
  const { data, error } = await supabase.from("ghe_treinamento_exame").select("*").eq("id_ghe", id_ghe);
  if (error) throw error;
  return data;
}

export async function fetchTreinamentosExamesByFuncionario(id_funcionario: number): Promise<GheTreinamentoExame[]> {
  // Busca o GHE do funcionário e retorna os treinamentos/exames relacionados
  const { data: funcionario, error: errFunc } = await supabase.from("funcionario").select("id_ghe").eq("id_sst", id_funcionario).single();
  if (errFunc) throw errFunc;
  return fetchTreinamentosExamesByGhe(funcionario.id_ghe);
}

export async function insertTreinamentoExame(te: GheTreinamentoExame): Promise<GheTreinamentoExame> {
  const { data, error } = await supabase.from("ghe_treinamento_exame").insert([te]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTreinamentoExame(id: number): Promise<void> {
  const { error } = await supabase.from("ghe_treinamento_exame").delete().eq("id_sst", id);
  if (error) throw error;
}
