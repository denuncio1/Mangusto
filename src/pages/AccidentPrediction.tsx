import React, { useState } from "react";
import NearMissUploader from "@/components/NearMissUploader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function mockPredictAccidentRisk(data) {
  // Exemplo: conta quantos "quase acidentes" por setor e gera alerta se > 3 no mês
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const bySetor = {};
  data.forEach(row => {
    const d = new Date(row.data);
    if (d.getMonth() === month && d.getFullYear() === year) {
      bySetor[row.setor] = (bySetor[row.setor] || 0) + 1;
    }
  });
  return Object.entries(bySetor).map(([setor, count]) => {
    const countNum = typeof count === 'number' ? count : Number(count);
    return {
      setor,
      count: countNum,
      risk: countNum >= 3 ? Math.min(80 + (countNum - 3) * 5, 99) : countNum === 2 ? 60 : countNum === 1 ? 40 : 10,
      message: countNum >= 3 ? `ALERTA: Setor ${setor} tem ${countNum} quase acidentes este mês. Risco elevado de afastamento por estresse!` : `Setor ${setor} com ${countNum} quase acidentes este mês.`
    };
  });
}

export default function AccidentPredictionPage() {
  const [nearMissData, setNearMissData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  function handleData(data) {
    setNearMissData(data);
    setPredictions(mockPredictAccidentRisk(data));
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-center mt-6">Predição de Acidentes por IA</h1>
      <NearMissUploader onData={handleData} />
      {predictions.length > 0 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Alertas e Predições</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full border text-xs">
              <thead>
                <tr>
                  <th className="border px-2">Setor</th>
                  <th className="border px-2">Quase Acidentes (mês)</th>
                  <th className="border px-2">Risco (%)</th>
                  <th className="border px-2">Alerta</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p, i) => (
                  <tr key={i}>
                    <td className="border px-2 font-bold">{p.setor}</td>
                    <td className="border px-2">{p.count}</td>
                    <td className="border px-2">{p.risk}</td>
                    <td className={`border px-2 ${p.risk >= 80 ? 'text-red-700 font-bold' : p.risk >= 60 ? 'text-orange-600' : 'text-green-700'}`}>{p.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
