import { supabase } from "./supabaseClient";
import { NR, FuncionarioNR } from "@/types/nr";

export async function fetchNRs(): Promise<NR[]> {
  const { data, error } = await supabase.from("nr").select("*");
  if (error) throw error;
  return data;
}

export async function fetchFuncionarioNRs(id_funcionario: number): Promise<NR[]> {
  const { data, error } = await supabase
    .from("funcionario_nr")
    .select("nr(*)")
    .eq("id_funcionario", id_funcionario);
  if (error) throw error;
  return data.map((row) => row.nr);
}

export async function updateFuncionarioNRs(id_funcionario: number, nrIds: number[]): Promise<void> {
  // Remove todos e insere os selecionados
  await supabase.from("funcionario_nr").delete().eq("id_funcionario", id_funcionario);
  if (nrIds.length > 0) {
    const rows = nrIds.map(id_nr => ({ id_funcionario, id_nr }));
    await supabase.from("funcionario_nr").insert(rows);
  }
}
