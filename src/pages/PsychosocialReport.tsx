import React from "react";
import PsychosocialReportForm from "@/components/PsychosocialReportForm";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { useAuth } from "@/hooks/useAuth.tsx";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function PsychosocialReportPage() {
  const { user } = useAuth();
  const [myReports, setMyReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchMyReports() {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("psychosocial_reports")
      .select("id, tipo, mensagem, created_at")
      .eq("user_id", user.id)
      .eq("anonimo", false)
      .order("created_at", { ascending: false });
    if (!error && data) setMyReports(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMyReports();
    // eslint-disable-next-line
  }, [user]);

  async function handleDelete(id: number) {
    if (!window.confirm("Deseja remover este relato?")) return;
    await supabase.from("psychosocial_reports").delete().eq("id", id).eq("user_id", user.id);
    fetchMyReports();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-6 px-2">
      <BackToMenuButton />
      <h1 className="text-2xl font-bold text-center mb-4">Canal de Denúncia/Sugestão Psicossocial</h1>
      <p className="text-center text-muted-foreground mb-6 max-w-lg">
        Este canal é exclusivo para colaboradores relatarem, de forma anônima ou identificada, situações de risco psicossocial, sugestões de melhoria ou outros relatos relacionados ao ambiente de trabalho. Todas as mensagens são tratadas com confidencialidade.
      </p>
      <PsychosocialReportForm onSubmit={fetchMyReports} />
      {user && (
        <div className="w-full max-w-md mt-8">
          <h2 className="font-semibold mb-2 text-lg">Meus relatos enviados (identificados)</h2>
          {loading ? (
            <div>Carregando...</div>
          ) : myReports.length === 0 ? (
            <div className="text-gray-500">Nenhum relato identificado enviado.</div>
          ) : (
            <ul className="space-y-2">
              {myReports.map(r => (
                <li key={r.id} className="border rounded p-2 flex flex-col gap-1 bg-white">
                  <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                  <div className="font-medium">{r.tipo}</div>
                  <div className="text-sm break-words">{r.mensagem}</div>
                  <Button size="sm" variant="destructive" className="self-end mt-1" onClick={() => handleDelete(r.id)}>Remover</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
