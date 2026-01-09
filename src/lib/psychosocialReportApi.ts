import { supabase } from "@/lib/supabaseClient";

export async function savePsychosocialReport({ tipo, mensagem, anonimo, userId }: { tipo: string; mensagem: string; anonimo: boolean; userId?: string }) {
  const { error } = await supabase.from("psychosocial_reports").insert({
    tipo,
    mensagem,
    anonimo,
    user_id: anonimo ? null : userId || null,
    created_at: new Date().toISOString(),
  });
  if (error) throw error;
}
