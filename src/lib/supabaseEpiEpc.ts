import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export type EPIEPC = {
  id: number;
  nome: string;
  tipo: string;
  ca?: string;
  validade_ca?: string;
  fabricante?: string;
  estoque: number;
  periodicidade_troca?: number;
  created_at?: string;
};

export type EPIEPCEntrega = {
  id: number;
  id_epi_epc: number;
  id_funcionario: number;
  data_entrega: string;
  quantidade: number;
  termo_assinado: boolean;
  validade?: string;
  created_at?: string;
};

export async function getEPIEPCList(): Promise<EPIEPC[]> {
  const { data, error } = await supabase
    .from('epi_epc')
    .select('*')
    .order('nome', { ascending: true });
  if (error) throw error;
  return data as EPIEPC[];
}

export async function addEPIEPC(epi: Partial<EPIEPC>): Promise<EPIEPC> {
  const { data, error } = await supabase
    .from('epi_epc')
    .insert([epi])
    .select()
    .single();
  if (error) throw error;
  return data as EPIEPC;
}

export async function updateEPIEPC(id: number, epi: Partial<EPIEPC>): Promise<EPIEPC> {
  const { data, error } = await supabase
    .from('epi_epc')
    .update(epi)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as EPIEPC;
}

export async function deleteEPIEPC(id: number): Promise<void> {
  const { error } = await supabase
    .from('epi_epc')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function getEPIEPCEntregas(): Promise<EPIEPCEntrega[]> {
  const { data, error } = await supabase
    .from('entrega_epi_epc')
    .select('*');
  if (error) throw error;
  return data as EPIEPCEntrega[];
}

export async function addEPIEPCEntrega(entrega: Partial<EPIEPCEntrega>): Promise<EPIEPCEntrega> {
  const { data, error } = await supabase
    .from('entrega_epi_epc')
    .insert([entrega])
    .select()
    .single();
  if (error) throw error;
  return data as EPIEPCEntrega;
}
