import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock histórico
const mockHistory = [
  { date: "15/02/2026", setor: "Produção", score: 82, risk: "Alto Risco" },
  { date: "15/08/2025", setor: "Manutenção", score: 58, risk: "Médio Risco" },
  { date: "15/02/2025", setor: "Administrativo", score: 22, risk: "Baixo Risco" },
];

const PsychosocialHistory = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Histórico de Avaliações Psicossociais</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full border mt-2 text-sm">
            <thead>
              <tr>
                <th className="border px-2">Data</th>
                <th className="border px-2">Setor</th>
                <th className="border px-2">Score</th>
                <th className="border px-2">Risco</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2">{row.date}</td>
                  <td className="border px-2">{row.setor}</td>
                  <td className="border px-2">{row.score}</td>
                  <td className="border px-2"><Badge variant={row.risk === "Alto Risco" ? "destructive" : row.risk === "Médio Risco" ? "secondary" : "default"}>{row.risk}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychosocialHistory;
