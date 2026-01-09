import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";

interface NearMissData {
  setor: string;
  data: string;
  tipo: string;
  descricao: string;
}

export default function NearMissUploader({ onData }: { onData?: (data: NearMissData[]) => void }) {
  const [data, setData] = useState<NearMissData[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsed: NearMissData[] = (results.data as any[]).map(row => ({
            setor: row.setor || row["Setor"],
            data: row.data || row["Data"],
            tipo: row.tipo || row["Tipo"],
            descricao: row.descricao || row["Descricao"] || row["Descrição"]
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
        <CardTitle>Importar Histórico de Quase Acidentes (Near Miss) - CSV/Excel</CardTitle>
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
                  <th className="border px-2">Data</th>
                  <th className="border px-2">Tipo</th>
                  <th className="border px-2">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-2">{row.setor}</td>
                    <td className="border px-2">{row.data}</td>
                    <td className="border px-2">{row.tipo}</td>
                    <td className="border px-2 max-w-xs break-words">{row.descricao}</td>
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
