import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RelatorioFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      const { data, error } = await supabase.from("feedbacks_evidencias").select("id, nome, email, feedback, evidencia_url, created_at").order("created_at", { ascending: false });
      if (!error && data) setFeedbacks(data);
      setLoading(false);
    }
    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Relatório de Feedbacks e Evidências</h2>
      {loading ? <div>Carregando...</div> : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Data</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">E-mail</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Evidência</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(fb => (
              <tr key={fb.id}>
                <td className="p-2 border">{new Date(fb.created_at).toLocaleString()}</td>
                <td className="p-2 border">{fb.nome}</td>
                <td className="p-2 border">{fb.email}</td>
                <td className="p-2 border">{fb.feedback}</td>
                <td className="p-2 border">{fb.evidencia_url ? <a href={supabase.storage.from("evidencias").getPublicUrl(fb.evidencia_url).data.publicUrl} target="_blank" rel="noopener noreferrer">Ver arquivo</a> : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
