
import { supabase } from './supabaseClient';

// Utilitário para enviar notificação por e-mail via Supabase Edge Function (exemplo)
export async function sendOrderNotification({ to, subject, message }) {
  // Supondo que você tenha uma Edge Function chamada 'send-email'
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, message },
  });
  return { data, error };
}
