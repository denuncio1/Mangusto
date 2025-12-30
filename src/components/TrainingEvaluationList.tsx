import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

export default function TrainingEvaluationList({ trainingId }) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trainingId) return;
    setLoading(true);
    supabase
      .from("ead_training_evaluation")
      .select("*", { count: "exact" })
      .eq("training_id", trainingId)
      .order("data_avaliacao", { ascending: false })
      .then(({ data }) => {
        setEvaluations(data || []);
        setLoading(false);
      });
  }, [trainingId]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando avaliações...</div>
          ) : (
            <ul className="space-y-2">
              {evaluations.map((ev) => (
                <li key={ev.id} className="border-b pb-2 mb-2">
                  <div><b>Usuário:</b> {ev.user_id}</div>
                  <div><b>Resultado:</b> {ev.resultado}</div>
                  <div><b>Tipo:</b> {ev.tipo}</div>
                  <div><b>Data:</b> {new Date(ev.data_avaliacao).toLocaleString()}</div>
                  <div><b>Situações Práticas:</b> {ev.situacoes_praticas}</div>
                  {ev.comprovante_url && <div><a href={ev.comprovante_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver comprovante</a></div>}
                </li>
              ))}
              {evaluations.length === 0 && <li>Nenhuma avaliação registrada.</li>}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
