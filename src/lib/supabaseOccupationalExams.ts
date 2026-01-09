import { supabase } from './supabaseClient';

export async function fetchOccupationalExams() {
  const { data, error } = await supabase
    .from('occupational_exams')
    .select('*');
  if (error) throw error;
  return data;
}

export async function insertOccupationalExam(exam) {
  const { data, error } = await supabase
    .from('occupational_exams')
    .insert([exam])
    .select();
  if (error) throw error;
  return data;
}

export async function updateOccupationalExam(id, updates) {
  const { data, error } = await supabase
    .from('occupational_exams')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteOccupationalExam(id) {
  const { error } = await supabase
    .from('occupational_exams')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
