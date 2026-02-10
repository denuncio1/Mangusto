import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MentalHeatmapChart from "@/components/MentalHeatmapChart";

// Mock data for dashboard
const mockDimensions = [
  { name: "Demandas Emocionais", score: 82, color: "bg-red-600", risk: "Alto Risco" },
  { name: "Ritmo de Trabalho", score: 58, color: "bg-yellow-400", risk: "Médio Risco" },
  { name: "Reconhecimento", score: 22, color: "bg-green-600", risk: "Baixo Risco" },
];
const mockCriticalSectors = [
  { setor: "Produção", risco: "Alto Risco" },
  { setor: "Manutenção", risco: "Médio Risco" },
];
const mockHeatmap = [
  { setor: "Produção", absenteismo: 18, turnover: 12, risco: 82 },
  { setor: "Manutenção", absenteismo: 10, turnover: 8, risco: 58 },
  { setor: "Administrativo", absenteismo: 4, turnover: 2, risco: 22 },
];
const mockBenchmarks = [
  { name: "Demandas Emocionais", benchmark: 40 },
  { name: "Ritmo de Trabalho", benchmark: 35 },
  { name: "Reconhecimento", benchmark: 60 },
];

const PsychosocialDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard de Riscos Psicossociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockDimensions.map((d, i) => (
              <div key={i} className={`rounded-lg p-4 text-white ${d.color} flex flex-col gap-2`}>
                <div className="text-lg font-bold">{d.name}</div>
                <div className="text-3xl font-mono">{d.score}</div>
                <Badge variant={d.risk === "Alto Risco" ? "destructive" : d.risk === "Médio Risco" ? "secondary" : "default"}>{d.risk}</Badge>
                <div className="text-xs mt-2">Benchmark: <span className="font-semibold">{mockBenchmarks.find(b => b.name === d.name)?.benchmark ?? "-"}</span></div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-semibold mb-2">Setores Críticos</div>
            <ul className="list-disc ml-6">
              {mockCriticalSectors.map((s, i) => (
                <li key={i}><span className="font-bold">{s.setor}</span>: {s.risco}</li>
              ))}
            </ul>
          </div>
          <MentalHeatmapChart data={mockHeatmap} />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button onClick={() => navigate("/psychosocial-assessment")} className="w-full md:w-auto">Aplicar Novo Questionário</Button>
            <Button onClick={() => navigate("/psychosocial-action-plan")} variant="secondary" className="w-full md:w-auto">Ver Plano de Ação</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychosocialDashboard;
