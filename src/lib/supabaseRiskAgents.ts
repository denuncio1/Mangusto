import { supabase } from './supabaseClient';

export async function fetchOccupationalRiskAgents() {
  const { data, error } = await supabase
    .from('occupational_risk_agents')
    .select('*');
  if (error) throw error;
  return data;
}

export async function insertOccupationalRiskAgent(agent) {
  const { data, error } = await supabase
    .from('occupational_risk_agents')
    .insert([agent])
    .select();
  if (error) throw error;
  return data;
}

export async function updateOccupationalRiskAgent(id, updates) {
  const { data, error } = await supabase
    .from('occupational_risk_agents')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteOccupationalRiskAgent(id) {
  const { error } = await supabase
    .from('occupational_risk_agents')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
