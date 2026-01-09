import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ThirdParty {
  name: string;
  risks: any[];
}

const ThirdPartyConsolidation = () => {
  const [thirdParties, setThirdParties] = useState<ThirdParty[]>([]);
  const [importName, setImportName] = useState("");

  // Importar inventário de uma contratada
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && importName) {
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          setThirdParties(prev => [...prev, { name: importName, risks: data }]);
        } catch {
          alert("Arquivo inválido. Envie um JSON exportado do inventário de riscos.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Consolidação de Riscos de Terceiros</h1>
      <Card>
        <CardHeader>
          <CardTitle>Importar Inventário de Contratada</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Nome da Contratada"
            value={importName}
            onChange={e => setImportName(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <input type="file" accept="application/json" onChange={handleImport} />
        </CardContent>
      </Card>
      {thirdParties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Painel Consolidado</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-3 py-2 border">Contratada</th>
                  <th className="px-3 py-2 border">Risco</th>
                  <th className="px-3 py-2 border">Classificação</th>
                  <th className="px-3 py-2 border">Setor</th>
                  <th className="px-3 py-2 border">Situação</th>
                </tr>
              </thead>
              <tbody>
                {thirdParties.map((tp, i) =>
                  tp.risks.map((r, j) => (
                    <tr key={i + '-' + j}>
                      <td className="px-3 py-2 border">{tp.name}</td>
                      <td className="px-3 py-2 border">{r.riskName || r.perigo}</td>
                      <td className="px-3 py-2 border">{r.classificacao || r.description?.match(/Nível: (\w+)/)?.[1] || '-'}</td>
                      <td className="px-3 py-2 border">{r.setor || '-'}</td>
                      <td className="px-3 py-2 border">
                        {r.status || (r.classificacao === 'Alto' || r.description?.includes('Alto') ? 'Atenção' : 'OK')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThirdPartyConsolidation;
