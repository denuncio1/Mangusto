import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import MentalHeatmapUploader from "@/components/MentalHeatmapUploader";
import MentalHeatmapChart from "@/components/MentalHeatmapChart";


const mockInventory = [
  { setor: "Produção", risco: "Ruído excessivo", nivel: "Alto" },
  { setor: "Manutenção", risco: "Produtos químicos", nivel: "Médio" },
];

const mockActionPlan = [
  { acao: "Treinamento de EPI", responsavel: "RH", prazo: "2026-01-10", status: "Concluída" },
  { acao: "Instalação de barreiras acústicas", responsavel: "Engenharia", prazo: "2026-02-15", status: "Em andamento" },
];

const IntegratedReports = () => {
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Relatório Integrado: Inventário e Plano de Ação", 14, 18);

    doc.setFontSize(12);
    doc.text("Inventário de Riscos Ocupacionais", 14, 30);
    autoTable(doc, {
      startY: 34,
      head: [["Setor", "Risco", "Nível"]],
      body: mockInventory.map(item => [item.setor, item.risco, item.nivel]),
    });

    let nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50;
    doc.text("Plano de Ação Psicossocial", 14, nextY);
    autoTable(doc, {
      startY: nextY + 4,
      head: [["Ação", "Responsável", "Prazo", "Status"]],
      body: mockActionPlan.map(item => [item.acao, item.responsavel, item.prazo, item.status]),
    });

    // Heatmap mental: alertas e recomendações
    if (heatmapData.length > 0) {
      let y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 80;
      doc.setFontSize(13);
      doc.text("Mapa de Calor Mental: Alertas e Recomendações", 14, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [["Setor", "Score Combinado", "Alerta", "Recomendação"]],
        body: getHeatmapRecommendations().map(row => [row.setor, row.score.toFixed(1), row.alert, row.recommendation]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [220, 38, 38] },
      });
    }

    doc.save("relatorio-integrado.pdf");
    toast.success("Relatório PDF gerado com sucesso!");
  };

  const [heatmapData, setHeatmapData] = React.useState<any[]>([]);

  // Gera recomendações e alertas automáticos com base no score combinado
  function getHeatmapRecommendations() {
    if (!heatmapData.length) return null;
    return heatmapData.map((row: any) => {
      const score = (row.absenteismo * 0.4) + (row.turnover * 0.3) + (row.risco * 0.3);
      let alert = null;
      let recommendation = null;
      if (score >= 30) {
        alert = 'ALERTA CRÍTICO';
        recommendation = 'Atenção máxima: setor com alto absenteísmo, turnover e risco psicossocial. Recomenda-se intervenção imediata, investigação de causas e suporte especializado.';
      } else if (score >= 20) {
        alert = 'ALERTA';
        recommendation = 'Setor com tendência preocupante. Recomenda-se análise detalhada, plano de ação preventivo e acompanhamento próximo.';
      } else if (score >= 10) {
        alert = 'OBSERVAÇÃO';
        recommendation = 'Setor com sinais de atenção. Mantenha monitoramento e promova ações de bem-estar.';
      } else {
        alert = 'OK';
        recommendation = 'Setor saudável. Mantenha boas práticas.';
      }
      return { setor: row.setor, score, alert, recommendation };
    });
  }

  const heatmapRecs = getHeatmapRecommendations();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Relatórios Integrados ao Inventário e Plano de Ação</h1>
      <MentalHeatmapUploader onData={setHeatmapData} />
      {heatmapData.length > 0 && <MentalHeatmapChart data={heatmapData} />}
      {heatmapRecs && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Alertas e Recomendações Automáticas por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full border mt-2 text-xs">
              <thead>
                <tr>
                  <th className="border px-2">Setor</th>
                  <th className="border px-2">Score Combinado</th>
                  <th className="border px-2">Alerta</th>
                  <th className="border px-2">Recomendação</th>
                </tr>
              </thead>
              <tbody>
                {heatmapRecs.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-2 font-bold">{row.setor}</td>
                    <td className="border px-2">{row.score.toFixed(1)}</td>
                    <td className={`border px-2 font-bold ${row.alert === 'ALERTA CRÍTICO' ? 'text-red-700' : row.alert === 'ALERTA' ? 'text-orange-600' : row.alert === 'OBSERVAÇÃO' ? 'text-yellow-600' : 'text-green-700'}`}>{row.alert}</td>
                    <td className="border px-2">{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Gerar Relatórios Integrados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Gere relatórios completos que integram dados do inventário de riscos e do plano de ação psicossocial.
          </p>
          <Button onClick={handleGenerateReport} className="w-full">Gerar Relatório (PDF)</Button>
          <p className="text-sm text-muted-foreground">
            (Os relatórios podem incluir gráficos, tabelas e análises de tendências.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedReports;