import { supabase } from './supabaseClient';

export type Risco = {
  id: number;
  agente: string;
  tipo_agente: string;
  probabilidade: number;
  severidade: number;
  medidas_controle: string;
  epi?: string;
  epc?: string;
  numero_ca?: string;
  validade_ca?: string;
  id_ghe?: number;
};

export async function getRiscos(): Promise<Risco[]> {
  const { data, error } = await supabase
    .from('risco')
    .select('*');
  if (error) throw error;
  return data as Risco[];
}
