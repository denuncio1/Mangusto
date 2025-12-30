import { supabase } from "@/lib/supabaseClient";

export async function logDocumentAction({ action, file, user }) {
  const { error } = await supabase.from("document_logs").insert({
    action,
    file,
    user,
    timestamp: new Date().toISOString(),
  });
  return !error;
}

export async function fetchDocumentLogs() {
  const { data, error } = await supabase.from("document_logs").select("*", { count: "exact" }).order("timestamp", { ascending: false });
  if (error) return [];
  return data;
}
