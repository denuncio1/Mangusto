import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

export default function TrainingLogList({ trainingId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trainingId) return;
    setLoading(true);
    supabase
      .from("ead_training_log")
      .select("*", { count: "exact" })
      .eq("training_id", trainingId)
      .order("data_acesso", { ascending: false })
      .then(({ data }) => {
        setLogs(data || []);
        setLoading(false);
      });
  }, [trainingId]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Logs de Acesso e Conclusão</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando logs...</div>
          ) : (
            <ul className="space-y-2">
              {logs.map((log) => (
                <li key={log.id} className="border-b pb-2 mb-2">
                  <div><b>Usuário:</b> {log.user_id}</div>
                  <div><b>Ação:</b> {log.acao}</div>
                  <div><b>Data:</b> {new Date(log.data_acesso).toLocaleString()}</div>
                  <div><b>Detalhes:</b> {log.detalhes}</div>
                </li>
              ))}
              {logs.length === 0 && <li>Nenhum log registrado.</li>}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
