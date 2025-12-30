import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/lib/supabaseClient";

const ReportAutomation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      // Buscar dados reais de riscos_ocupacionais
      const { data, error } = await supabase.from('riscos_ocupacionais').select('*');
      if (error) throw error;
      const riscos = data || [];
      // Se não houver dados, exibe mensagem
      if (!riscos.length) {
        setError("Nenhum dado real encontrado em 'riscos_ocupacionais'.");
        setLoading(false);
        return;
      }
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Relatório Automatizado de Riscos e Ações", 14, 18);
      doc.setFontSize(12);
      autoTable(doc, {
        startY: 30,
        head: [["Setor", "Risco", "Ação", "Status"]],
        body: riscos.map((item: any) => [item.setor, item.perigo || item.risco, item.acao || "-", item.status || "-"]),
      });
      doc.save("relatorio-automatizado.pdf");
    } catch (err: any) {
      setError("Erro ao gerar relatório: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Automação de Relatórios</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gerar Relatório Automatizado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Gere automaticamente relatórios sobre riscos e ações integradas.
          </p>
          <Button onClick={handleGenerateReport} className="w-full mb-2" disabled={loading}>
            {loading ? "Gerando..." : "Gerar Relatório (PDF)"}
          </Button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportAutomation;