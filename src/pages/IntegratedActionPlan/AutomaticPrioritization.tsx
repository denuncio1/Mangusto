import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const AutomaticPrioritization = () => {
  const [prioritized, setPrioritized] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePrioritize = async () => {
    setLoading(true);
    toast.info("Priorização automática de ações acionada!");
    // Buscar medidas do banco e ordenar por trabalhadores_expostos (desc)
    const { data, error } = await supabase
      .from("action_plan_measures")
      .select("id, measure_name, description, responsible, due_date, trabalhadores_expostos, created_at")
      .order("trabalhadores_expostos", { ascending: false });
    if (error) {
      toast.error("Erro ao buscar medidas para priorização.");
      setLoading(false);
      return;
    }
    setPrioritized(data || []);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Priorização Automática de Ações</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Priorizar Ações com Base em Trabalhadores Expostos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Esta funcionalidade permite priorizar automaticamente as ações do plano com base no número de trabalhadores expostos aos riscos.
          </p>
          <Button onClick={handlePrioritize} className="w-full" disabled={loading}>
            {loading ? "Priorizando..." : "Executar Priorização Automática"}
          </Button>
          {prioritized.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Ações Priorizadas</h2>
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-2 py-1 border">Medida</th>
                    <th className="px-2 py-1 border">Descrição</th>
                    <th className="px-2 py-1 border">Responsável</th>
                    <th className="px-2 py-1 border">Prazo</th>
                    <th className="px-2 py-1 border">Trabalhadores Expostos</th>
                  </tr>
                </thead>
                <tbody>
                  {prioritized.map((m) => (
                    <tr key={m.id}>
                      <td className="border px-2 py-1">{m.measure_name}</td>
                      <td className="border px-2 py-1">{m.description}</td>
                      <td className="border px-2 py-1">{m.responsible}</td>
                      <td className="border px-2 py-1">{m.due_date ? new Date(m.due_date).toLocaleDateString() : "-"}</td>
                      <td className="border px-2 py-1 text-center">{m.trabalhadores_expostos ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            (A priorização será exibida em uma tabela ou lista após a execução.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomaticPrioritization;