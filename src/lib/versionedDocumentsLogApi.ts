// API para registrar logs de ação em documentos versionados
import { supabase } from "@/lib/supabaseClient";

export async function logDocumentAction(document_id, action, user) {
  const { id, email } = user || {};
  const { error } = await supabase.from("versioned_documents_log").insert({
    document_id,
    action,
    user_id: id,
    user_email: email,
    details: null,
  });
  return !error;
}

export async function fetchDocumentTimeline(document_id) {
  const { data, error } = await supabase
    .from("versioned_documents_timeline")
    .select("event_time, event_type, user_email, details")
    .eq("document_id", document_id)
    .order("event_time", { ascending: false });
  return error ? [] : data;
}

export async function addDocumentComment(document_id, comment, user) {
  const { id, email } = user || {};
  const { error } = await supabase.from("versioned_documents_comments").insert({
    document_id,
    user_id: id,
    user_email: email,
    comment,
  });
  return !error;
}
