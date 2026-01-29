import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SupabaseTableCheck() {
  useEffect(() => {
    async function checkTables() {
      try {
        // Tente acessar algumas tabelas comuns
        const tables = [
          "sectors",
          "sector_risks",
          "occupational_risk_agents",
          "occupational_exams",
          "cids",
          "document_logs",
          "psychosocial_reports",
        ];
        for (const table of tables) {
          const { error } = await supabase.from(table).select("*").limit(1);
          if (error) {
            console.warn(`Tabela não encontrada ou erro em '${table}':`, error.message);
          } else {
            console.log(`Tabela '${table}' existe e está acessível.`);
          }
        }
      } catch (err) {
        console.error("Erro ao checar tabelas Supabase:", err);
      }
    }
    checkTables();
  }, []);

  return null;
}
