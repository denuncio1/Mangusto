import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis } from "@/components/ui/chart";
import { FileDown } from "lucide-react";

// Mock Data
const kpiData = {
  riskLevel: "Médio",
  pendingActions: 5,
  compliance: 95,
};

const chartData = [
  { month: "Jan", performance: 88 },
  { month: "Fev", performance: 92 },
  { month: "Mar", performance: 95 },
  { month: "Abr", performance: 91 },
  { month: "Mai", performance: 93 },
  { month: "Jun", performance: 96 },
];

const pendingActionsData = [
  { id: 1, description: "Revisar plano de emergência de incêndio", responsible: "Ana Silva", dueDate: "2025-12-31", status: "Pendente" },
  { id: 2, description: "Realizar treinamento de primeiros socorros", responsible: "Carlos Souza", dueDate: "2026-01-15", status: "Em Andamento" },
  { id: 3, description: "Inspecionar extintores de incêndio", responsible: "Ana Silva", dueDate: "2025-12-28", status: "Pendente" },
  { id: 4, description: "Atualizar inventário de riscos", responsible: "Mariana Lima", dueDate: "2026-02-01", status: "Não Iniciado" },
  { id: 5, description: "Agendar simulação de evacuação", responsible: "Carlos Souza", dueDate: "2026-01-20", status: "Pendente" },
];

const chartConfig = {
  performance: {
    label: "Desempenho (%)",
    color: "hsl(var(--chart-1))",
  },
};

const Dashboard = () => {
  const handleExport = () => {
    // Logic to export reports will be implemented here
    alert("Funcionalidade de exportar relatórios a ser implementada.");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Dashboard Gerencial</h1>
        <Button onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar Relatórios
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Nível de Risco Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-500">{kpiData.riskLevel}</p>
            <p className="text-xs text-muted-foreground">Baseado nas últimas avaliações</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">{kpiData.pendingActions}</p>
            <p className="text-xs text-muted-foreground">Requerem atenção imediata</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conformidade (SST)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">{kpiData.compliance}%</p>
            <p className="text-xs text-muted-foreground">Índice de conformidade com as normas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho em SST (Últimos 6 Meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart data={chartData}>
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis domain={[80, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="performance" fill="var(--color-performance)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pending Actions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Corretivas e Preventivas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingActionsData.slice(0, 4).map((action) => ( // Show first 4 for brevity
                  <TableRow key={action.id}>
                    <TableCell className="font-medium">{action.description}</TableCell>
                    <TableCell>{action.responsible}</TableCell>
                    <TableCell>{action.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={action.status === "Pendente" ? "destructive" : "secondary"}>
                        {action.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             <Button variant="link" className="mt-4 w-full">Ver todas as ações</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;