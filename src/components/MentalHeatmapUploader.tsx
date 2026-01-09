import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";

interface HeatmapData {
  setor: string;
  absenteismo: number;
  turnover: number;
  risco: number;
}

export default function MentalHeatmapUploader({ onData }: { onData?: (data: HeatmapData[]) => void }) {
  const [data, setData] = useState<HeatmapData[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsed: HeatmapData[] = (results.data as any[]).map(row => ({
            setor: row.setor || row["Setor"],
            absenteismo: Number(row.absenteismo || row["Absenteismo"] || 0),
            turnover: Number(row.turnover || row["Turnover"] || 0),
            risco: Number(row.risco || row["Risco"] || 0),
          }));
          setData(parsed);
          setError(null);
          if (onData) onData(parsed);
        } catch (err) {
          setError("Erro ao processar o arquivo. Verifique o formato CSV.");
        }
      },
      error: () => setError("Erro ao ler o arquivo CSV."),
    });
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Importar Dados de Absenteísmo, Turnover e Risco (CSV/Excel)</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} />
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {data.length > 0 && (
          <div className="mt-4">
            <b>Prévia dos dados importados:</b>
            <table className="min-w-full border mt-2 text-xs">
              <thead>
                <tr>
                  <th className="border px-2">Setor</th>
                  <th className="border px-2">Absenteísmo (%)</th>
                  <th className="border px-2">Turnover (%)</th>
                  <th className="border px-2">Risco Psicossocial</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-2">{row.setor}</td>
                    <td className="border px-2">{row.absenteismo}</td>
                    <td className="border px-2">{row.turnover}</td>
                    <td className="border px-2">{row.risco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
