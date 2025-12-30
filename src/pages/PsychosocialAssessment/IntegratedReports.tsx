import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";


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

    doc.save("relatorio-integrado.pdf");
    toast.success("Relatório PDF gerado com sucesso!");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Relatórios Integrados ao Inventário e Plano de Ação</h1>
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