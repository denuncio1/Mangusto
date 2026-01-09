import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, Cell } from "recharts";

interface HeatmapData {
  setor: string;
  absenteismo: number;
  turnover: number;
  risco: number;
}

interface MentalHeatmapChartProps {
  data: HeatmapData[];
}

// Função para calcular cor baseada nos valores
function getHeatColor(absenteismo: number, turnover: number, risco: number) {
  // Score ponderado simples: cada fator de 0 a 100
  const score = (absenteismo * 0.4) + (turnover * 0.3) + (risco * 0.3);
  if (score >= 30) return "#dc2626"; // vermelho
  if (score >= 20) return "#f59e42"; // laranja
  if (score >= 10) return "#facc15"; // amarelo
  return "#22c55e"; // verde
}

export default function MentalHeatmapChart({ data }: MentalHeatmapChartProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Mapa de Calor Mental (Absenteísmo, Turnover, Risco)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis dataKey="setor" interval={0} angle={0} dy={15} tick={{ fontSize: 14 }} />
            <YAxis label={{ value: 'Índice Combinado (%)', angle: -90, position: 'insideLeft', style: { fontSize: 14 } }} tick={{ fontSize: 14 }} />
            <Tooltip formatter={(value: any, name: any, props: any) => `${value}%`} />
            <Legend />
            <Bar dataKey="absenteismo" name="Absenteísmo (%)" fill="#2563eb" />
            <Bar dataKey="turnover" name="Turnover (%)" fill="#f59e42" />
            <Bar dataKey="risco" name="Risco Psicossocial" fill="#a21caf" />
            {/* Heatmap visual: barra de score combinado */}
            <Bar dataKey={(row: HeatmapData) => (row.absenteismo * 0.4 + row.turnover * 0.3 + row.risco * 0.3)} name="Score Combinado" >
              {data.map((row, i) => (
                <Cell key={i} fill={getHeatColor(row.absenteismo, row.turnover, row.risco)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
