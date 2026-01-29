import { supabase } from './supabaseClient';

export async function fetchOccupationalAccidents() {
  const { data, error } = await supabase
    .from('occupational_accidents')
    .select('*')
    .order('data_acidente', { ascending: false });
  if (error) throw error;
  return data;
}
