import { supabase } from './supabaseClient';

export async function fetchSectors() {
  const { data, error } = await supabase
    .from('sectors')
    .select('*');
  if (error) throw error;
  return data;
}

export async function fetchSectorRisks(sectorId: number) {
  const { data, error } = await supabase
    .from('sector_risks')
    .select('*, occupational_risk_agents(*)')
    .eq('sector_id', sectorId);
  if (error) throw error;
  return data;
}

export async function insertSector(sector) {
  const { data, error } = await supabase
    .from('sectors')
    .insert([sector])
    .select();
  if (error) throw error;
  return data;
}

export async function insertSectorRisk(sectorRisk) {
  const { data, error } = await supabase
    .from('sector_risks')
    .insert([sectorRisk])
    .select();
  if (error) throw error;
  return data;
}


export async function updateSector(id, updates) {
  const { data, error } = await supabase
    .from('sectors')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteSector(id) {
  const { data, error } = await supabase
    .from('sectors')
    .delete()
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}
