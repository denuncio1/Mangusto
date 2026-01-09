import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

interface Report {
  id: number;
  tipo: string;
  mensagem: string;
  anonimo: boolean;
  user_id?: string;
  created_at: string;
}

export default function PsychosocialReportAdminList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      const { data, error } = await supabase
        .from("psychosocial_reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setReports(data);
      setLoading(false);
    }
    fetchReports();
  }, []);

  // Filtro e exportação
  const filtered = filter ? reports.filter(r => r.tipo === filter) : reports;
  function handleExport() {
    const csv = Papa.unparse(filtered.map(r => ({
      Data: new Date(r.created_at).toLocaleString(),
      Tipo: r.tipo,
      Mensagem: r.mensagem,
      Anonimo: r.anonimo ? "Sim" : "Não",
      Usuario: r.anonimo ? "-" : r.user_id || "-"
    })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatos-psicossociais.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Relatos Psicossociais Recebidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <label className="font-medium">Filtrar por tipo:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todos</option>
            <option value="denuncia">Denúncia de risco psicossocial</option>
            <option value="sugestao">Sugestão de melhoria</option>
            <option value="outro">Outro</option>
          </select>
          <button onClick={handleExport} className="ml-auto px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Exportar CSV</button>
        </div>
        {loading ? (
          <div>Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-500">Nenhum relato encontrado.</div>
        ) : (
          <table className="min-w-full border text-xs">
            <thead>
              <tr>
                <th className="border px-2">Data</th>
                <th className="border px-2">Tipo</th>
                <th className="border px-2">Mensagem</th>
                <th className="border px-2">Anônimo?</th>
                <th className="border px-2">Usuário</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td className="border px-2">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="border px-2">{r.tipo}</td>
                  <td className="border px-2 max-w-xs break-words">{r.mensagem}</td>
                  <td className="border px-2">{r.anonimo ? "Sim" : "Não"}</td>
                  <td className="border px-2">{r.anonimo ? "-" : r.user_id || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
